import numpy as np
import pandas as pd

np.random.seed(42)
NUM_SAMPLES = 500

rows = []

for _ in range(NUM_SAMPLES):
    team_size = np.random.randint(1, 21)
    task_count = np.random.randint(1, 101)

    # Priority distribution — must sum to task_count
    high = np.random.randint(0, task_count + 1)
    medium = np.random.randint(0, task_count - high + 1)
    low = task_count - high - medium

    # Completion rate
    completion_rate = round(np.random.uniform(0.0, 1.0), 2)

    # --- Duration calculation ---

    # Base: each task takes ~2 days
    base_days = task_count * 2.0

    # Team efficiency — larger teams work in parallel (diminishing returns)
    parallelism = 1 + (0.3 * np.log(team_size + 1))
    adjusted = base_days / parallelism

    # Priority complexity — high priority tasks are harder
    high_ratio = high / task_count if task_count > 0 else 0
    medium_ratio = medium / task_count if task_count > 0 else 0
    priority_multiplier = 1 + (0.4 * high_ratio) + (0.1 * medium_ratio)
    adjusted *= priority_multiplier

    # Completion reduction — work already done reduces remaining time
    remaining = 1 - (completion_rate * 0.8)
    adjusted *= remaining

    # Add realistic random noise ±15%
    noise = np.random.uniform(0.85, 1.15)
    actual_days = int(adjusted * noise)

    # Clamp between 5 and 365
    actual_days = max(5, min(365, actual_days))

    rows.append({
        'team_size': team_size,
        'task_count': task_count,
        'high_priority_count': high,
        'medium_priority_count': medium,
        'low_priority_count': low,
        'completion_rate': completion_rate,
        'actual_days': actual_days
    })

df = pd.DataFrame(rows)

# Validation checks
assert (df['high_priority_count'] + df['medium_priority_count'] + df['low_priority_count'] == df['task_count']).all(), \
    "Priority counts don't sum to task_count"
assert df['actual_days'].between(5, 365).all(), \
    "actual_days out of range"
assert df['completion_rate'].between(0.0, 1.0).all(), \
    "completion_rate out of range"
assert (df['team_size'] >= 1).all(), \
    "team_size below minimum"

df.to_csv('project_data.csv', index=False)

print(f"Dataset generated: {len(df)} rows")
print("\nSample (first 5 rows):")
print(df.head())
print("\nStatistics:")
print(df.describe())
print("\nAll validation checks passed.")