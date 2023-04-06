from flask import Flask, request, jsonify, render_template
import openai
from config import OPENAI_API_KEY


app = Flask(__name__)
openai.api_key = OPENAI_API_KEY

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/style.css")
def style():
    return render_template("style.css")

@app.route("/script.js")
def script():
    return render_template("script.js")

@app.route("/api/chatgpt", methods=["POST"])
def chat_gpt():
    data = request.get_json()
    message = data.get("message")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}]
    )
    return jsonify({"response": response['choices'][0]['message']['content']})

if __name__ == "__main__":
    app.run(debug=True, port=8000)
