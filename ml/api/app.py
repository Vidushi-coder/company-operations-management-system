import pickle
import numpy as np
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model on startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'model.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        model_data = pickle.load(f)
    
    model = model_data['model']
    features = model_data['features']
    model_confidence = model_data['confidence']
    model_mae = model_data['mae']
    model_r2 = model_data['r2']
    
    print(f"Model loaded successfully")
    print(f"Features: {features}")
    print(f"R² Score: {model_r2:.4f}")
    print(f"MAE: {model_mae:.2f} days")
    print(f"Confidence: {model_confidence}%")

except FileNotFoundError:
    print(f"ERROR: Model file not found at {MODEL_PATH}")
    print("Please run train_model.py first")
    model = None

@app.route('/', methods=['GET'])
def health():
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded'
        }), 500
    
    return jsonify({
        'status': 'ok',
        'message': 'AI Project Completion Predictor is running',
        'model_confidence': model_confidence,
        'model_r2': model_r2,
        'model_mae': model_mae
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({
            'error': 'Model not loaded. Please train the model first.'
        }), 500

    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No JSON body received'}), 400

    required_fields = [
        'team_size',
        'task_count',
        'high_priority_count',
        'medium_priority_count',
        'low_priority_count',
        'completion_rate'
    ]
    
    missing = [f for f in required_fields if f not in data]
    if missing:
        return jsonify({
            'error': f'Missing required fields: {missing}'
        }), 400

    try:
        team_size = int(data['team_size'])
        task_count = int(data['task_count'])
        high = int(data['high_priority_count'])
        medium = int(data['medium_priority_count'])
        low = int(data['low_priority_count'])
        completion_rate = float(data['completion_rate'])
    except (ValueError, TypeError) as e:
        return jsonify({'error': f'Invalid data types: {str(e)}'}), 400

    if team_size < 1:
        return jsonify({'error': 'team_size must be at least 1'}), 400
    if task_count < 1:
        return jsonify({'error': 'task_count must be at least 1'}), 400
    if high + medium + low != task_count:
        return jsonify({
            'error': f'Priority counts ({high}+{medium}+{low}={high+medium+low}) must sum to task_count ({task_count})'
        }), 400
    if not 0.0 <= completion_rate <= 1.0:
        return jsonify({'error': 'completion_rate must be between 0.0 and 1.0'}), 400

    input_features = np.array([[
        team_size,
        task_count,
        high,
        medium,
        low,
        completion_rate
    ]])

    raw_prediction = model.predict(input_features)[0]
    predicted_days = max(5, int(round(raw_prediction)))

    individual_predictions = []
    for estimator in model.estimators_:
        individual_predictions.append(estimator.predict(input_features)[0])
    
    prediction_std = np.std(individual_predictions)
    uncertainty_ratio = prediction_std / max(predicted_days, 1)
    
    adjusted_confidence = model_confidence - (uncertainty_ratio * 30)
    final_confidence = round(max(50, min(99, adjusted_confidence)), 1)

    print(f"Prediction: {predicted_days} days | "
          f"Confidence: {final_confidence}% | "
          f"Input: team={team_size}, tasks={task_count}, "
          f"high={high}, med={medium}, low={low}, "
          f"completion={completion_rate}")

    return jsonify({
        'predicted_days': predicted_days,
        'confidence': final_confidence
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') != 'production'
    print("Starting AI Project Completion Predictor API...")
    app.run(host='0.0.0.0', port=port, debug=debug)