# Company Operations Management System

## Overview

The Company Operations Management System (COMS) is a full-stack web-based
enterprise application designed to streamline and centralize organizational
operations. It provides a unified platform for managing employees, projects,
tasks, leave requests, notifications, and analytics through a role-based
access control system.

---

## Live Application

| Layer | URL |
|-------|-----|
| **Frontend** | https://company-operations-management-syste.vercel.app |
| **Backend API** | https://coms-backend-2xvx.onrender.com |

> **Note:** The backend is hosted on Render's free tier and may take
> 30-60 seconds to respond on the first request after a period of
> inactivity. Subsequent requests will be fast.

---

## Problem Statement

Organizations often rely on multiple disconnected spreadsheets, email
chains, and manual processes to manage employees, projects, tasks, and
leave requests. This leads to inefficiencies, data inconsistencies, and
limited visibility into ongoing operations.

COMS addresses these challenges by providing a single centralized platform
for managing all day-to-day organizational activities with real-time
analytics and role-based access control.

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
- Automatic overdue detection based on deadline
- Project detail page with live task counts

### Task Management
- Kanban board with To Do / In Progress / Done columns
- Fine-grained access — employees can only update their own task status
- Priority levels with colour-coded indicators (High / Medium / Low)
- Project-based filtering

### Leave Management
- Apply, approve, reject, and cancel leave requests
- Overlap detection prevents conflicting leave requests
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

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

### Version Control
- Git
- GitHub

---

## User Roles

| Role | Capabilities |
|------|-------------|
| **Admin** | Full system access — manages all users, employees, projects, tasks, leaves and analytics |
| **Manager** | Creates and manages projects and tasks, approves or rejects leave requests |
| **Employee** | Views own data, updates own task status, applies for leave |

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
├── docs/                # Documentation
├── design/              # Wireframes and UI design system
└── diagrams/            # ER diagram and use case diagram
```

---

## Local Development Setup

### Prerequisites
- Node.js v18 or higher
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
# Edit .env and add your MONGO_URI and JWT_SECRET

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
| PUT | /api/notifications/:id/read | All roles | Mark as read |
| PUT | /api/notifications/read-all | All roles | Mark all as read |
| DELETE | /api/notifications/:id | All roles | Delete notification |

### Dashboard
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/dashboard/admin | Admin | Admin stats and charts |
| GET | /api/dashboard/manager | Manager | Manager stats and charts |
| GET | /api/dashboard/employee | Employee | Employee stats and charts |

---

## Documentation

| Document | Description |
|----------|-------------|
| `docs/requirements.md` | Software Requirements Specification |
| `docs/system-overview.md` | System purpose, scope, roles and modules |
| `docs/user-manual.md` | End user guide for all three roles |
| `docs/test-cases.md` | Manual test cases across all modules |
| `docs/weekly-log.md` | Week-by-week progress reports |
| `design/wireframe-notes.md` | Low-fidelity wireframes for all screens |
| `design/ui-design-system.md` | Colors, typography, and component standards |
| `diagrams/er-diagram.png` | Entity Relationship Diagram |
| `diagrams/use-case-diagram.png` | Use Case Diagram |

---

## Development Timeline

| Week | Focus | Status |
|------|-------|--------|
| Week 4 | Requirement Analysis and System Design | ✅ Complete |
| Week 5 | Authentication Module | ✅ Complete |
| Week 6 | Employee and Project Management | ✅ Complete |
| Week 7 | Task and Leave Management | ✅ Complete |
| Week 8 | Notifications and Dashboard Analytics | ✅ Complete |
| Week 9 | Testing, Deployment and Documentation | ✅ Complete |

---

## Author

**Vidushi Gupta**
Industry Internship Project — Quantum AI Innovation
Evaluated by SoCSEA — August 2026