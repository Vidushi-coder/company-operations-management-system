# Company Operations Management System

## Overview

The Company Operations Management System (COMS) is a full-stack web-based
enterprise application designed to streamline and centralize organizational
operations. It provides a unified platform for managing employees, projects,
tasks, leave requests, notifications, and analytics through a role-based
access control system, enhanced with an AI-assisted project completion
predictor.

---

## Live Application

| Layer | URL |
|-------|-----|
| **Frontend** | https://company-ops-management.vercel.app/ |
| **Backend API** | https://coms-backend-2xvx.onrender.com |
| **ML Prediction API** | https://coms-ml-api.onrender.com/ |

> **Note:** Both the backend and ML Prediction API are hosted on Render's
> free tier and may take 30-60 seconds to respond on the first request
> after a period of inactivity (~15 minutes). Subsequent requests will be
> fast. If demonstrating live, warm up both services beforehand.

---

## Problem Statement

Organizations often rely on multiple disconnected spreadsheets, email
chains, and manual processes to manage employees, projects, tasks, and
leave requests. This leads to inefficiencies, data inconsistencies, and
limited visibility into ongoing operations.

COMS addresses these challenges by providing a single centralized platform
for managing all day-to-day organizational activities, complete with
real-time analytics, role-based access control, and predictive insights
into project timelines.

---

## Key Features

### Authentication and Security
- JWT-based authentication with 7-day session tokens
- bcrypt password hashing — passwords never stored in plain text
- Role-Based Access Control (RBAC) for Admin, Manager, and Employee roles
- Automatic session expiry redirect on token invalidation

### Employee Management
- Add, edit, delete, and search employee records
- Employee profiles with assigned projects, tasks, and leave history
- Linked User account creation on employee addition

### Project Management
- Create and manage projects with status tracking
- Assign and remove team members
- Automatic overdue detection based on deadline (computed, not stored)
- Project detail page with live task counts

### Task Management
- Kanban board with To Do / In Progress / Done columns
- Fine-grained access — employees can only update their own task status
- Priority levels with colour-coded indicators (High / Medium / Low)
- Project-based filtering

### Leave Management
- Apply, approve, reject, and cancel leave requests
- Overlap detection prevents conflicting leave requests
- Self-approval and cross-manager approval prevention
- Dual-view interface — employee history vs manager approval view
- Tab filters for Pending, Approved, Rejected requests

### Notification System
- Automatic notifications on task assignment, project membership, and leave decisions
- Real-time unread count on bell icon with 30-second polling
- Full notifications page with read/unread management

### Dashboard and Analytics
- Role-specific dashboards with Chart.js visualizations
- Admin: Employee distribution, project status, task completion, leave breakdown
- Manager: Team metrics, project and task charts, deadline risk indicators
- Employee: Personal task status, priority breakdown, leave balance

### AI Project Completion Predictor
- Predicts a project's likely completion time using a trained Random Forest
  Regressor (R² 0.9224, MAE 6.37 days) served by a Python Flask microservice
- Inputs: team size, task count, priority breakdown, and current completion rate
- Returns predicted days to completion, a confidence score, and a suggested
  deadline, with a one-click "Apply Deadline" action
- Visible to Admin and Manager roles on the Project Detail page

---

## Technology Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Chart.js + react-chartjs-2
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose ODM

### Authentication
- JSON Web Tokens (JWT)
- bcryptjs

### Machine Learning Service
- Python Flask (prediction microservice)
- scikit-learn (Random Forest Regressor)
- pandas, numpy (data processing)
- gunicorn (production WSGI server)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **ML Service:** Render
- **Database:** MongoDB Atlas

### Version Control
- Git
- GitHub

---

## User Roles

| Role | Capabilities |
|------|-------------|
| **Admin** | Full system access — manages all users, employees, projects, tasks, leaves and analytics |
| **Manager** | Creates and manages projects and tasks, approves or rejects leave requests, views AI completion predictions |
| **Employee** | Views own data, updates own task status, applies for leave |

> Note: Admin accounts (created via direct registration) do not have an
> Employee profile by design, so Admins cannot apply for leave or be
> assigned to tasks/projects. This is an intentional limitation, not a bug.

---

## Project Architecture

```
company-operations-management-system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth and role middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper utilities
│   └── server.js        # Express server entry point
│
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── api/         # Axios instance
│       ├── components/  # Reusable UI components
│       ├── context/     # AuthContext
│       ├── layouts/     # DashboardLayout
│       ├── pages/       # Page components
│       └── utils/       # Helper functions
│
├── ml/
│   ├── dataset/          # Synthetic training data (CSV)
│   ├── model/             # Trained Random Forest model (.pkl)
│   └── api/               # Flask prediction service
│
├── docs/                # Documentation
├── design/              # Wireframes and UI design system
└── diagrams/            # ER diagram and use case diagram
```

---

## Local Development Setup

### Prerequisites
- Node.js v18 or higher
- Python 3.9 or higher (for the ML service)
- A MongoDB Atlas account
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Vidushi-coder/company-operations-management-system.git
cd company-operations-management-system/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MONGO_URI, JWT_SECRET, and FLASK_URL

# Start development server
npm run dev
```

The backend runs on `http://localhost:5000`

### Frontend Setup

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Create local environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

The frontend runs on `http://localhost:5173`

### ML Service Setup

```bash
cd ml/api
pip install -r requirements.txt
python app.py
```

The Flask ML API runs on `http://localhost:5001`. Make sure the backend's
`FLASK_URL` environment variable points to this address for local testing.

---

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register a new user |
| POST | /api/auth/login | Public | Login and receive JWT token |

### Employees
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/employees | All roles | Get all employees |
| POST | /api/employees | Admin | Add new employee |
| GET | /api/employees/:id | All roles | Get employee by ID |
| PUT | /api/employees/:id | Admin | Update employee |
| DELETE | /api/employees/:id | Admin | Delete employee |

### Projects
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/projects | All roles | Get all projects |
| POST | /api/projects | Admin/Manager | Create project |
| GET | /api/projects/:id | All roles | Get project by ID |
| PUT | /api/projects/:id | Admin/Manager | Update project |
| DELETE | /api/projects/:id | Admin/Manager | Delete project |
| POST | /api/projects/:id/assign-member | Admin/Manager | Assign member |
| DELETE | /api/projects/:id/members/:employeeId | Admin/Manager | Remove member |

### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/tasks | All roles | Get tasks (scoped by role) |
| POST | /api/tasks | Admin/Manager | Create task |
| GET | /api/tasks/:id | All roles | Get task by ID |
| PUT | /api/tasks/:id | All roles | Update task (role-restricted) |
| DELETE | /api/tasks/:id | Admin/Manager | Delete task |
| GET | /api/tasks/employee/:employeeId | All roles | Tasks for employee profile |
| GET | /api/tasks/project/:projectId | All roles | Tasks for project detail |

### Leave
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/leave | All roles | Get leave requests (scoped) |
| POST | /api/leave | All roles | Apply for leave |
| PUT | /api/leave/:id/approve | Admin/Manager | Approve leave |
| PUT | /api/leave/:id/reject | Admin/Manager | Reject leave |
| DELETE | /api/leave/:id | All roles | Cancel leave request |

### Notifications
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/notifications | All roles | Get own notifications |
| PUT | /api/notifications/read-all | All roles | Mark all as read |
| PUT | /api/notifications/:id/read | All roles | Mark as read |
| DELETE | /api/notifications/:id | All roles | Delete notification |

### Dashboard
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/dashboard/admin | Admin | Admin stats and charts |
| GET | /api/dashboard/manager | Manager | Manager stats and charts |
| GET | /api/dashboard/employee | Employee | Employee stats and charts |

### ML Prediction
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/ml/predict | Admin/Manager | Predict project completion time |

---

## Known Limitations

- Manager dashboards currently show all projects/tasks rather than only their own (planned for future scope)
- ML predictions are deterministic and may be identical for very small projects (team < 3, tasks < 5)
- No drag-and-drop on the Kanban board — status changes go through a modal
- Notifications use 30-second polling rather than real-time WebSockets

---

## Documentation

| Document | Description |
|----------|-------------|
| `docs/requirements.md` | Software Requirements Specification |
| `docs/system-overview.md` | System purpose, scope, roles and modules |
| `docs/user-manual.md` | End user guide for all three roles |
| `docs/test-cases.md` | 58 manual test cases across all modules |
| `docs/weekly-log.md` | Week-by-week progress reports (Weeks 4-11) |
| `docs/ml-feature.md` | ML feature architecture, dataset design, and model performance |
| `design/wireframe-notes.md` | Low-fidelity wireframes for all screens |
| `design/ui-design-system.md` | Colors, typography, and component standards |
| `database/database-planning.md` | Collection descriptions and data flow considerations |
| `diagrams/database-entities.md` | Formal entity definitions with types and constraints |
| `diagrams/er-diagram.png` | Entity Relationship Diagram |
| `diagrams/use-case-diagram.png` | Use Case Diagram |
| `ml/README.md` | ML module structure and local setup |

---

## Development Timeline

| Week | Dates | Focus | Status |
|------|-------|-------|--------|
| Week 4 | 8-14 Jun | Requirements analysis, system design, ER & Use Case diagrams | ✅ Complete |
| Week 5 | 15-21 Jun | JWT authentication, React/Tailwind setup, Login page | ✅ Complete |
| Week 6 | 22-28 Jun | Employee & Project Management (full CRUD) | ✅ Complete |
| Week 7 | 29 Jun-5 Jul | Task Management (Kanban + RBAC), Leave Management | ✅ Complete |
| Week 8 | 7-13 Jul | Notification system, Dashboard analytics, Employee Profile | ✅ Complete |
| Week 9 | 14-21 Jul | Backend/Frontend deployment, test cases, user manual | ✅ Complete |
| Week 10 | 21-26 Jul | ML feature: dataset generation, model training, Flask API, React UI | ✅ Complete |
| Week 11 | 27-30 Jul | Flask deployment, final testing, documentation, presentation prep | ✅ Complete |

---

## Author

**Vidushi Gupta**
Software Development Intern — Quantum AI Innovation