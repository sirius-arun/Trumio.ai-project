from flask import Flask, request, jsonify
import json
from utils import predict, recommend
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# run_with_ngrok(app)  # Start ngrok when the app is run

# Create a route that accepts JSON data via POST request


@app.route('/predict', methods=['POST'])
def api_predict():
    if request.method == 'POST':
        try:
            # Decode bytes to string and load as JSON
            data_str = request.data.decode('utf-8')
            data_dict = json.loads(data_str)

            prob_stat = data_dict.get('prob_stat', "")
            avg_scores = data_dict.get('avg_scores', [])
            proposals = data_dict.get('proposals', [])
            project_key = data_dict.get('project_key', [])
            team_key = data_dict.get('team_key', [])
            amounts = data_dict.get('amounts', [])

            return jsonify({"prediction": predict(prob_stat, avg_scores, proposals, project_key, team_key, amounts)})

        except json.JSONDecodeError as e:
            return f"Error decoding JSON: {str(e)}", 400


@app.route('/recommend', methods=['POST'])
def api_recommend():
    if request.method == 'POST':
        try:
            # Decode bytes to string and load as JSON
            data_str = request.data.decode('utf-8')
            data_dict = json.loads(data_str)

            key_words = data_dict.get('key_words', [])
            prompt = data_dict.get('prompt', "")
            print(prompt)
            return jsonify({"keys": recommend(key_words, prompt)})

        except json.JSONDecodeError as e:
            return f"Error decoding JSON: {str(e)}", 400


if __name__ == '__main__':
    app.run()
