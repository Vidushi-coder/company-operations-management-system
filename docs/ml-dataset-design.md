# ML Dataset Design

**Feature:** AI Project Completion Predictor
**Date:** 21 July 2026

---

## Dataset Overview

- **Rows:** 500 synthetic project records
- **Format:** CSV
- **File name:** `ml/dataset/project_data.csv`

---

## Feature Columns

| Column | Type | Range | Notes |
|--------|------|-------|-------|
| team_size | int | 1–20 | Number of members assigned |
| task_count | int | 1–100 | Total tasks under the project |
| high_priority_count | int | 0–task_count | High priority tasks |
| medium_priority_count | int | 0–task_count | Medium priority tasks |
| low_priority_count | int | 0–task_count | Low priority tasks |
| completion_rate | float | 0.0–1.0 | Proportion of tasks marked Done |
| actual_days | int | 5–365 | Target variable — days to complete |

---

## File Location

```
ml/
├── dataset/
│   └── project_data.csv
├── model/
│   └── model.pkl
└── api/
    └── app.py
```