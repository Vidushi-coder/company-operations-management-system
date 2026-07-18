# System Overview

**Project Name:** Company Operations Management System  
**Author:** Vidushi Gupta  
**Last Updated:** June 2025  
**Status:** Requirement Analysis & Planning  

---

## Purpose

The Company Operations Management System is a web-based enterprise application designed to centralize and streamline day-to-day organizational operations. It eliminates the reliance on disconnected spreadsheets, email chains, and manual processes by providing a single unified platform to manage employees, projects, tasks, and leave requests.

**The system aims to:**

- Reduce manual effort involved in HR and project management workflows
- Provide real-time visibility into organizational activities for decision makers
- Enforce role-based access control so each user sees and does only what is relevant to them
- Improve collaboration between managers and employees through a shared platform

---

## Scope

### In Scope

- User authentication with role-based access control
- Employee records management (add, update, delete, search)
- Project creation, assignment, and progress tracking
- Task creation, assignment, priority setting, and status monitoring
- Leave application, approval, rejection, and history tracking
- Role-based dashboards with operational summaries and reports

### Out of Scope

- Payroll or salary processing
- Biometric or GPS-based attendance tracking
- Mobile application (Android / iOS)
- Third-party HR software integrations
- Real-time chat or internal messaging
- Document or file storage management

---

## User Roles

| Role     | Description                                                  | Access Level |
|----------|--------------------------------------------------------------|--------------|
| Admin    | Full system access, manages all users and system data        | Highest      |
| Manager  | Manages projects and tasks, approves or rejects leave        | Intermediate |
| Employee | Views own profile and tasks, applies for leave               | Lowest       |

### Role Permissions Breakdown

| Feature                  | Admin | Manager | Employee |
|--------------------------|-------|---------|----------|
| Register / Manage Users  | ✅    | ❌      | ❌       |
| Add / Delete Employees   | ✅    | ❌      | ❌       |
| View All Employee Records| ✅    | ✅      | ❌       |
| View Own Profile         | ✅    | ✅      | ✅       |
| Create Projects          | ✅    | ✅      | ❌       |
| Assign Employees to Projects | ✅ | ✅     | ❌       |
| View All Projects        | ✅    | ✅      | ✅       |
| Create and Assign Tasks  | ✅    | ✅      | ❌       |
| View Own Assigned Tasks  | ✅    | ✅      | ✅       |
| Apply for Leave          | ✅    | ✅      | ✅       |
| Approve / Reject Leave   | ✅    | ✅      | ❌       |
| View All Leave Requests  | ✅    | ✅      | ❌       |
| View Own Leave History   | ✅    | ✅      | ✅       |
| Access System Reports    | ✅    | ❌      | ❌       |

---

## High-Level Modules

### 1. Authentication & Authorization

Handles user registration, login, and secure session management using JWT (JSON Web Tokens). Enforces role-based access control across all modules so that pages and actions are restricted based on the logged-in user's role.

**Users:** All roles  
**Key Actions:** Register, Login, Logout, Token Validation, Role Verification

---

### 2. Employee Management

Allows the admin to add new employees, update their information, search and filter through employee records, and delete records when needed. Each employee has a dedicated profile page displaying their personal details, assigned projects, and task summary.

**Users:** Admin (full access), Manager and Employee (view only)  
**Key Actions:** Add Employee, Edit Employee, Delete Employee, Search Employee, View Profile

---

### 3. Project Management

Enables creation and management of projects within the organization. Projects can be assigned to specific employees, tracked by status, and monitored against deadlines. Managers and admins can update project details and view all associated tasks.

**Users:** Admin and Manager (create/manage), Employee (view assigned projects)  
**Key Actions:** Create Project, Assign Members, Update Status, Set Deadline, View Project Details

---

### 4. Task Management

Tasks are always created under a specific project and assigned to individual employees. Supports priority levels (High, Medium, Low) and status tracking (To Do, In Progress, Done). Managers assign tasks while employees update their progress.

**Users:** Admin and Manager (create/assign), Employee (view and update own tasks)  
**Key Actions:** Create Task, Assign Task, Set Priority, Update Task Status, View Task Details

---

### 5. Leave Management

Employees can submit leave requests specifying the leave type, date range, and reason. Managers and admins review pending requests and either approve or reject them with remarks. A complete leave history is maintained for every employee.

**Users:** All roles  
**Key Actions:** Apply for Leave, Approve Leave, Reject Leave, View Leave History, View Pending Requests

---

### 6. Dashboard & Analytics

Displays a summarized overview of the system's data, personalized based on the logged-in user's role. Admins see system-wide statistics including employee distribution, project status, task completion rates and leave summaries through interactive Chart.js visualizations. Managers see their team and project summaries. Employees see their personal task and leave statistics.

**Users:** All roles (content varies by role)  
**Key Actions:** View Summary Cards, View Chart Visualizations, View Recent Activity

### 7. Notification System

Automatically generates notifications for key system events such as task assignments, project assignments, and leave request updates. Notifications are displayed to the relevant user in real time so they are always informed of actions that affect them.

**Users:** All roles  
**Key Actions:** Receive Task Assignment Notification, Receive Leave Approval Notification, Receive Leave Rejection Notification, Receive Project Assignment Notification