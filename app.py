from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model
model_path = "model/sleep_apnea_model.pkl"
with open(model_path, "rb") as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get JSON data from frontend
        features = np.array([
            [
                data['age'], data['bmi'], data['ahi']
            ]
        ])

        # Make a prediction using the model
        prediction = model.predict(features)[0]

        # Convert numeric prediction to labels
        labels = {0: 'Mild Sleep Apnea', 1: 'Moderate Sleep Apnea', 2: 'Severe Sleep Apnea', 3: 'Normal'}
        result = labels.get(prediction, "Unknown")

        # Return the prediction as JSON
        return jsonify({'prediction': result})

    except Exception as e:
        # Handle errors and return an error message
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)