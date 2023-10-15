import os

import openai
import random
import json
import embedding
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

functions = [ 
    {
        "name": "get_available_models",
        "description": "Get a list of all the available phone models",
        "parameters": None,
    },
    {
        "name": "search",
        "description": "Find the closest phone spec in the database to the given phone spec.",
        "parameters": {
            "type": "object",
            "properties": {
                "phone_spec": {
                    "type": "string",
                    "description": """A JSON string representing a PhoneSpec with the following schema:
                        {
                            id: string,
                            name: string,
                            color: string,
                            battery: string | null,
                            camera: {
                                general: string | null,
                                video: string | null,
                                modes: string | null,
                                front: string | null,
                                rear: string | null
                            },
                            storage: number | null,
                            price: number,
                            brand: string,
                            used: boolean,
                            screen_size: number | null,
                            description: string | null,
                        }""" 
                },
                "k": {
                    "type": "integer",
                    "description": "The number of closest phone specs to return.",
                    "default": 3
                },
                "cutoff": {
                    "type": "number",
                    "description": "The minimum cosine distance to consider.",
                    "default": 0.5
                }
            },
            "required": ["phone_spec"]
        }
    }
]

@app.route("/", methods=("POST",))
def repsonse():
    prompt = request.form["user-prompt"]

    session['transcript'] = session.get('transcript', []) + [{"role": "user", "content": prompt}]
    messages = session.get('messages', INITIAL_PROMPT)
    messages.append({"role": "user", "content": prompt})
    messages += INSTRUCTIONS

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
        functions = functions
        # temperature=0.6,
    )

    try:
        resp_object = json.loads(response["choices"][0]["message"]["content"])
        message = resp_object['message']
        history = resp_object['history']

        session['messages'] = [
            {"role": "system", "content": history},
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": message}
        ]
    except json.JSONDecodeError as e:
        pass

    session.modified = True
    return redirect(url_for('index', result=response['choices'][0]['message']['content']))


@app.route("/", methods=("GET",))
def index():
    result = request.args.get("result")
    return render_template("index.html", result=result)
