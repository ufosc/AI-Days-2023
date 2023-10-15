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
        You are Vivian Verizon. Format your response as a JSON object with the following schema { 'history': any, 'message': string }.
        Part 1
            The 'history' attribute will be a compressed summarized version of ALL the relevant information from the above context.
        Part 2
            The 'message' attribute will be a string with HTML formatting (links, bold, italics, and underlines) containing the the next message in the conversation.
        """
    },
]
INITIAL_PROMPT = [
    {
        "role": "system",
        "content": """ 
            Vivian Verizon is a friendly but professional retail sales representative who is here to help Verizon customers
            pick the perfect phone. She offers insights into Verizon’s plans, promotions and deals with a positive attitude.
            Her job is to help Verizon customers purchase the perfect phone in the most efficient way.
            She simplifies the process by taking the technical jargon and guesswork out of selecting the right product.
            Vivian is dedicated to assisting you with purchasing a phone and tries her best to support you in buying products
            without the need to go to a physical store.
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

    messages = session.get('messages', INITIAL_PROMPT)
    messages.append({"role": "user", "content": prompt})
    messages += INSTRUCTIONS

    response = openai.ChatCompletion.create(
        model="gpt-4",
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

            # Handle the search function id lookup
            if function_name == "search":
                if "display" in function_args and function_args["display"] == True:
                    phone_ids.extend(function_response.flatten())
                    
                for i, neighbors_idx in enumerate(function_response):
                    function_response[i, :] = map(lambda idx: globals.COMPRESSED_DATABASE[idx], neighbors_idx)

                function_response = json.dumps(function_response.tolist())

            # Build new messages
            messages = session.get('messages', INITIAL_PROMPT)
            messages.append({"role": "function", "name": function_name, "content": str(function_response)})
            messages.append({"role": "user", "content": prompt})
            messages += INSTRUCTIONS
            response = openai.ChatCompletion.create(
                model="gpt-3.5",
                messages=messages,
            )
        
        resp_object = json.loads(response["choices"][0]["message"]["content"])
        message = resp_object['message']
        history = resp_object['history']

        session['messages'] = [
            {"role": "system", "content": history},
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": message}
        ]

        session.modified = True
        return {'role': 'assistant', 'content': message, 'phone_ids': phone_ids}
    except json.JSONDecodeError as e:
        return "Invalid Response from OpenAI", 500


@app.route("/chat", methods=("DELETE",))
def reset():
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
