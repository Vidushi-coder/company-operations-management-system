# ML Module — AI Project Completion Predictor

This folder contains the machine learning microservice for the
AI-Assisted Project Completion Predictor feature.

## Structure

```
ml/
├── dataset/
│      └── project_data.csv
│
├── model/
│      └── model.pkl
│
├── api/
|    └── app.py
│
└── README.md
```

---

## Components

### dataset/

Contains the synthetic training dataset used for model development.

---

### model/

Stores the trained Machine Learning model after training.

---

### api/

Contains the Flask application responsible for serving project
completion predictions.

---

## Running Locally

```bash
cd ml/api
pip install -r requirements.txt
python app.py
```

The Flask API runs on http://localhost:5001

## Endpoint

POST /predict
Body: { team_size, task_count, high_priority_count,
        medium_priority_count, low_priority_count, completion_rate }
Returns: { predicted_days, confidence }