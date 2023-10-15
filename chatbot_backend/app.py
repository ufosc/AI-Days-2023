import os
import openai
import random
import json
import embedding
import ai_api
import globals
from message import Message
from string import ascii_letters, digits
from flask import Flask, redirect, render_template, request, url_for, session

app = Flask(__name__)
app.secret_key = "hello_world"
openai.api_key = os.getenv("OPENAI_API_KEY")

INSTRUCTIONS = [
    {
        "role": "system",
        "content": """
        You are Vivian Verizon. Format your response in 2 sections. Each section should be enclosed in triple quotes. 
        Section 1
            The 'history' section will be a compressed summarized version of ALL the relevant information from the above context.
        Section 2
            The 'message' section will be a string with HTML formatting (links, bold, italics, and underlines) containing the the next message in the conversation.
        ---------------------------------
        Example:
        \"""This is a summary of the past conversation.\"""
        \"""This is the next message in the conversation.\"""
        
        P.S.
        DO NOT rely on your knowledge of current phones and released models. ALWAYS lookup (use search function) information. You do not have access to the availability for each model so DO NOT say you are looking for the availability for a phone.
        """
    },
]
INITIAL_PROMPT = [
    {
        "role": "system",
        "content": """ 
            Vivian Verizon is a friendly but professional product navigator who is here to help Verizon customers
            pick the perfect phone. She offers insights into Verizon’s plans, promotions and deals with a positive attitude.
            Her job is to help Verizon customers purchase the perfect phone in the most efficient way.
            She simplifies the process by taking the technical jargon and guesswork out of selecting the right product.
            Vivian is dedicated to assisting you with purchasing a phone and tries her best to support you in buying products
            without the need to go to a physical store.
            
            Do not make staments that are not supported by the search function or this list.
            DO NOT FORGET THE FOLLOWING LIST!!!
            Verizon has/offers the following phones (listed as a collapsed list):
            iPhone 13 (, Pro, Pro Max)
            iPhone 14 (, Pro, Plus, Pro Max)
            iPhone 15 (, Pro, Plus, Pro Max)
            Other iPhones (XS, XR, SE 2020, SE 3rd Gen)
            Galaxy S20 (Ultra 5G, 5G UW, FE 5G UW)
            Galaxy Note20 (5G, Ultra 5G)
            Galaxy A (14 5G, 23 5G UW, 42 5G, 54 5G)
            Galaxy Z (Flip3 5G, Fold5, Flip4)
            Galaxy S21 (5G, FE 5G, S21+ 5G, Ultra 5G)
            Galaxy S22 (Ultra, S22+)
            Galaxy S23 (, Ultra)
            Galaxy S20 (5G UW, FE 5G UW)
            Google Pixel 6 (, 6a, Pro)
            Google Pixel 7 (a, Pro)
            Google Pixel 8 (, Pro)
            Google Pixel Folde
            Motorola edge+ (, 5G UW)
            Motorola moto g power (2022, pure)
            Motorola one 5G UW ace
            Motorola moto g stylus 5G
            Motorola edge - 2022
            TCL 30 V 5G
            TCL 10 5G UW
            Kyocera DuraForce (Ultra 5G UW, PRO 3, Sport 5G UW)
            Nokia 2 V Tella
            Nokia 8 V 5G UW
            Sonim XP8
        """
    },
    {
        "role": "assistant",
        "content": "Hi, there! I’m Vivian Verizon, your personalized product navigator. I’m here to simplify your phone buying process and help recommend products that are right for you."
    }
]


@app.route("/chat", methods=("POST",))
def chat():
    prompt = request.json["msg"]

    for _ in range(3):
        messages = session.get('messages', INITIAL_PROMPT)
        messages.append({"role": "user", "content": prompt})
        messages += INSTRUCTIONS

        response = openai.ChatCompletion.create(
            model=globals.GPT,
            messages=messages,
            functions=ai_api.AI_API_FUNCTIONS,
            # temperature=0.6,
        )

        try:
            response_message = response["choices"][0]["message"]
            phone_ids = []

            # If the response contains a function call, call the function
            if response_message.get("function_call"):
                available_functions = ai_api.AI_API_AVAILABLE_FUNCTIONS
                function_name = response_message["function_call"]["name"]
                function_to_call = available_functions[function_name]
                function_args = json.loads(
                    response_message["function_call"]["arguments"])
                function_response = function_to_call(**function_args)
                print(function_name, function_response)

                # Handle the search function id lookup
                if function_name == "search":
                    distances, indices = function_response
                    if "display" not in function_args or function_args["display"] == True:
                        phone_ids.extend(indices.flatten().tolist())

                    function_response = indices.tolist()
                    for i in range(len(indices)):
                        for j in range(len(indices[i])):
                            function_response[i][j] = globals.COMPRESSED_DATABASE[indices[i][j]]

                    function_response = json.dumps(function_response)

                # Build new messages
                messages = session.get('messages', INITIAL_PROMPT)
                messages.append({"role": "function", "name": function_name, "content": str(function_response)})
                messages.append({"role": "user", "content": prompt})
                messages += INSTRUCTIONS
                response = openai.ChatCompletion.create(
                    model=globals.GPT,
                    messages=messages,
                )
            
            splits = list(response["choices"][0]["message"]["content"].split('"""'))
            assert len(splits) == 5
            history = splits[1]
            message = splits[3]

            session['messages'] = [
                {"role": "system", "content": history},
                {"role": "user", "content": prompt},
                {"role": "assistant", "content": message}
            ]

            print("Session Messages:", session['messages'])

            session.modified = True
            return {'role': 'assistant', 'content': message, 'phone_ids': phone_ids}
        except AssertionError as e:
            print("MalformedReturn", response)
        
    return {'role': 'assistant', 'content': "Sorry, I didn't understand that. Please try again.", 'phone_ids': []}


@app.route("/chat", methods=("DELETE",))
def reset():
    if ('messages' in session):
        session.pop('messages')
    session.modified = True
    return "", 204  # No Content

@app.route("/phone/<int:phone_idx>", methods=("GET",))
def get_phone(phone_idx: int):
    if phone_idx < 0 or phone_idx >= len(globals.EXPANDED_DATABASE):
        return "Phone not found", 404
    phone = globals.EXPANDED_DATABASE[phone_idx]
    return phone

@app.route("/phones", methods=("GET",))
def get_phones():
    return json.dumps(globals.EXPANDED_DATABASE)

# @app.route("/", methods=("GET",))
# def index():
#     result = request.args.get('result')
#     return render_template("index.html", result=result)
