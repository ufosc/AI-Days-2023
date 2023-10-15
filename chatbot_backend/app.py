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
            The 'message' attribute will be a string with the the next message in the conversation.
        """
    },
]
INITIAL_PROMPT = [
    {
        "role": "system",
        "content": """ 
            Vivian Verizon is a friendly retail sales representative who is here to help Verizon customers
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
def repsonse():
    prompt = response.data

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
            function_args = json.loads(response_message["function_call"]["arguments"])
            function_response = function_to_call(**function_args)
            if function_name == "search":
                messages = session.get('messages', INITIAL_PROMPT)
                messages.append({
                "role": "function",
                "name": function_name,
                "content": function_response,
            })
                messages.append({"role": "user", "content": prompt})
                messages += INSTRUCTIONS
            elif function_name == "get_available_models":
                phone_jsons = []
                phone_ids = function_response
                for idx in function_response:
                    phone_jsons.append(globals.COMPRESSED_DATABASE[idx])
                messages = session.get('messages', INITIAL_PROMPT)
                messages.append({
                    "role": "function",
                    "name": function_name,
                    "content": phone_jsons,
                })
                messages.append({"role": "user", "content": prompt})
                messages += INSTRUCTIONS
            response = openai.ChatCompletion.create(
                model="gpt-4",
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
    except json.JSONDecodeError as e:
        "Invalid Response from OpenAI", 500

    session.modified = True

    return Message(response['choices'][0]['message']['role'], response['choices'][0]['message']['content'], phone_ids)


@app.route("/chat", methods=("DELETE",))
def reset():
    session.pop('messages')
    session.modified = True
    return "", 204  # No Content

@app.route("/phone/<string:phone_id>", methods=("GET",))
def get_phone(phone_id: str):
    phone = next((phone for phone in globals.EXPANDED_DATABASE if phone.id == phone_id), None)
    return phone if phone else "Phone not found", 404
