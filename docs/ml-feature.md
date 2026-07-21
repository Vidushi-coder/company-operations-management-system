# AI-Assisted Project Completion Predictor

**Feature Name:** AI Project Completion Predictor  
**Module:** Project Management — Project Detail Page  
**Author:** Vidushi Gupta  
**Date:** 21 July 2026  

---

## Problem Statement

Project managers currently set deadlines manually based on gut feeling
or experience. There is no data-driven mechanism to estimate how long
a project will take based on its complexity, team size, and task
distribution. This leads to either unrealistic deadlines (too tight)
or padded estimates (too loose), both of which hurt organizational
efficiency.

---

## Proposed Solution

An ML-powered prediction card embedded in the Project Detail page that
analyzes the project's current state — team size, task count, and
priority distribution — and returns an estimated completion time in
days along with a suggested deadline date and a confidence percentage.

---

## Where It Lives

The prediction card appears on the **Project Detail page** for
Admin and Manager roles only. It is not visible to Employees.

The card has four progressive states based on available project data:

### State 1 — No Data (0 members, 0 tasks)
Shows an informational message asking the manager to assign members
and create tasks before a prediction can be generated.

### State 2 — Members but No Tasks
Prompts the manager to create at least one task.

### State 3 — Tasks but No Members
Prompts the manager to assign at least one team member.

### State 4 — Ready for Prediction (members ≥ 1, tasks ≥ 1)
Shows project metrics and a Generate Estimate button.
On click, calls the Flask prediction API and displays results:
- Estimated duration in days
- Suggested deadline date
- Confidence percentage
- Apply Deadline button (updates the project's deadline)

---

## Input Features (what goes into the model)

| Feature | Description |
|---------|-------------|
| team_size | Number of employees assigned to the project |
| task_count | Total number of tasks under the project |
| high_priority_count | Number of High priority tasks |
| medium_priority_count | Number of Medium priority tasks |
| low_priority_count | Number of Low priority tasks |
| completion_rate | Proportion of tasks already marked Done |

---

## Output

| Output | Description |
|--------|-------------|
| predicted_days | Estimated number of days to complete the project |
| confidence | Model's confidence percentage (0-100) |

The suggested deadline is calculated as:

```
Today's Date + Predicted Days
```

---

## Algorithm

**Random Forest Regressor** from scikit-learn.

Chosen because:
- Handles non-linear relationships between features well
- Robust to outliers in training data
- Provides feature importance scores (useful for explainability)
- Works well on small-to-medium sized synthetic datasets
- Doesn't require feature scaling

---

## Architecture

```
React Frontend (Project Detail Page)
↓ POST /api/predict
Node.js Backend (Express)
↓ POST /predict
Python Flask Microservice
↓ returns { predicted_days, confidence }
Node.js Backend
↓ returns response to frontend
React Frontend (displays result)
```

The Flask service is kept completely separate from the Node.js backend.
Node.js acts as a proxy — the frontend never calls Flask directly.

---

## Why a Synthetic Dataset

Since COMS is a new application with no real historical project completion
data, the model will be trained on a carefully designed synthetic dataset
that encodes realistic domain knowledge:

- More tasks → more days
- Larger teams can handle more tasks in parallel → slightly fewer days
per task
- Higher proportion of High priority tasks → more complexity → more days
- Higher completion rate → fewer remaining days

The synthetic data will have 500 rows covering a wide range of project
scenarios to ensure the model generalizes well.

---

## Technology Stack for ML Feature

| Layer | Technology |
|-------|-----------|
| ML Model | scikit-learn RandomForestRegressor |
| API | Python Flask |
| Integration | Node.js proxy route |
| UI | React component on Project Detail page |