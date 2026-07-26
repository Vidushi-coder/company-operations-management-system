# AI-Assisted Project Completion Predictor

**Feature Name:** AI Project Completion Predictor  
**Module:** Project Management — Project Detail Page  
**Author:** Vidushi Gupta  
**Date:** 21 July 2026  

---

## Problem Statement

## Problem Statement

The Company Operations Management System enables project managers to
create projects, assign employees, and manage project tasks efficiently.
However, project deadlines are still determined manually based on
experience and assumptions.

After completing the core project management functionality, an
opportunity was identified to further improve the planning process by
providing data-driven project duration estimates.

This enhancement aims to assist managers in making more informed
deadline decisions using Machine Learning.

---

## Proposed Solution

As an enhancement to the existing Project Management module, an
AI-assisted Project Completion Predictor is introduced on the Project
Detail page.

The predictor analyzes the current state of a project—including team
size, task count, priority distribution, and completion progress—to
estimate the remaining project duration and recommend a suitable
completion deadline.

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

---

### Regenerate Estimate
Clicking Regenerate recalculates the prediction using the current
project metrics. If no project data has changed (team size, task count,
priorities, or completion rate), the result will be identical since
the Random Forest model is deterministic for the same input values.

---

## Known Limitations

### Small Project Granularity
For very small projects (team size < 3, task count < 5), the model
may produce identical predictions for slightly different inputs. This
occurs because the Random Forest decision trees group these small
values into the same leaf nodes during training. The model is most
accurate for projects with 3+ members and 5+ tasks, which reflects
realistic organizational project scenarios.