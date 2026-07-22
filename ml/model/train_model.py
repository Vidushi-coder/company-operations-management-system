import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv('../dataset/project_data.csv')

print(f"Dataset loaded: {len(df)} rows, {len(df.columns)} columns")
print(f"Columns: {list(df.columns)}")
print(f"\nFirst 3 rows:")
print(df.head(3))

# Define features and target
FEATURES = [
    'team_size',
    'task_count',
    'high_priority_count',
    'medium_priority_count',
    'low_priority_count',
    'completion_rate'
]
TARGET = 'actual_days'

X = df[FEATURES]
y = df[TARGET]

# Split into train and test sets (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Testing samples:  {len(X_test)}")

# Train the Random Forest model
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)

print("\nTraining model...")
model.fit(X_train, y_train)
print("Training complete.")

# Evaluate on test set
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\nModel Evaluation:")
print(f"  Mean Absolute Error (MAE): {mae:.2f} days")
print(f"  R² Score:                  {r2:.4f}")

# Feature importance
print(f"\nFeature Importances:")
for feature, importance in sorted(
    zip(FEATURES, model.feature_importances_),
    key=lambda x: x[1],
    reverse=True
):
    print(f"  {feature:<25} {importance:.4f}")

# Confidence calculation logic
def calculate_confidence(r2_score_val, mae_val, max_days=365):
    base_confidence = r2_score_val * 100
    accuracy_penalty = (mae_val / max_days) * 100
    confidence = base_confidence - accuracy_penalty
    return round(max(50, min(99, confidence)), 1)

model_confidence = calculate_confidence(r2, mae)
print(f"\nModel Confidence Score: {model_confidence}%")

# Manual prediction tests
print("\nManual Prediction Tests:")

test_cases = [
    {
        'label': 'Small project (2 people, 5 tasks, all low)',
        'data': [2, 5, 0, 0, 5, 0.0]
    },
    {
        'label': 'Medium project (6 people, 24 tasks, mixed)',
        'data': [6, 24, 5, 12, 7, 0.0]
    },
    {
        'label': 'Large project (15 people, 80 tasks, many high)',
        'data': [15, 80, 40, 30, 10, 0.0]
    },
    {
        'label': 'Nearly done project (10 people, 30 tasks, 80% done)',
        'data': [10, 30, 5, 15, 10, 0.8]
    }
]

for test in test_cases:
    pred = model.predict([test['data']])[0]
    print(f"  {test['label']}")
    print(f"    → Predicted: {int(pred)} days")

# Save the model
os.makedirs('../model', exist_ok=True)
model_path = '../model/model.pkl'

with open(model_path, 'wb') as f:
    pickle.dump({
        'model': model,
        'features': FEATURES,
        'mae': mae,
        'r2': r2,
        'confidence': model_confidence
    }, f)

print(f"\nModel saved to {model_path}")
print("\nTraining complete. Model is ready for Flask API.")