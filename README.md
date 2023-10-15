# AI-Days-2023

## Team Members
- Robert Conde
- Nikhil Iyer
- Grayson Kornberg
- Jonathan Mesa
- Rebecca Weinstein


## Project Description

A recommendation system to suggest smartphones by evaluating the user's purchasing behaviors, preferences and
interaction history with the chatbot. Created for the University of Florida Gator AI Hackathon.

## Technical Description

### Front-end

Single page application with smooth and intuitive UI primarily built using React, Bootstrap, and Vite.

### Back-end

Implemented using Flask and to facilitate API calls to OpenAI's state-of-the-art large language
models. Vivian's responses are facilitated using GPT-4, and was granted the ability to make direct requests for
information from a large set of structured data. This enables Vivian to give responses with specific, accurate, and up-to-date information

We collected current data from Verizon's selection of available smartphones keeping track of information such as price, color, storage, camera, battery, images, URLs, etc. Data normalization and semantic embedding was needed to remain robust against the variety of smartphone formats. This allowed us to search our structured data using unstructured queries taken directly from Vivian. This embedding strategy also allowed Vivian to draw graphical elements to the frontend.

## Screenshots
https://cdn.discordapp.com/attachments/1159278724311691345/1163221175376289832/Screenshot_2023-10-15_at_5.05.31_PM.png?ex=653ec923&is=652c5423&hm=390e054102576b35a2ad8562fd5d14928cbd25c9299472d65df450ac1af93892&
