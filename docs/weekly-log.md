# Week 4 Progress Report

**Project Name:** Company Operations Management System  
**Author:** Vidushi Gupta  
**Last Updated:** June 2026  
**Purpose:** Track weekly progress, key decisions, and major milestones across the project timeline.  

## Duration: 08 June 2026 – 14 June 2026

### Objectives

The objective of this week was to initiate the Company Operations Management System project and perform the requirement analysis and planning activities necessary before development.

### Activities Performed

#### Project Initialization

* Created the project repository and defined the overall project structure.
* Prepared the initial README and project documentation.

#### Requirement Analysis

* Identified the key business requirements of the system.
* Defined user roles and permissions.
* Finalized the major modules to be developed.

#### System Planning

* Prepared a high-level system overview.
* Planned the application architecture and workflow.
* Identified interactions between various modules.

#### Database Planning

* Designed the initial database structure.
* Identified core entities such as:

  * Users
  * Employees
  * Projects
  * Tasks
  * Leave Requests
  * Notifications

#### Entity Relationship Planning

* Defined relationships between entities.
* Planned data flow between modules.

### Deliverables Completed

* Project Initialization
* System Overview Document
* Design Planning Documentation
* Database Planning Documentation
* Entity Relationship Definition

### Outcome

By the end of the week, the project requirements, system architecture, and database planning were completed, providing a solid foundation for the design and development phases.

# Week 5 Progress Report

## Duration: 15 June 2026 – 21 June 2026

### Objectives

The objective of this week was to complete the system design phase and begin the implementation of the authentication module for the Company Operations Management System.

### Activities Performed

#### Database Design

* Created the Entity Relationship (ER) Diagram.
* Validated relationships between system entities.
* Finalized database design decisions.

#### System Design

* Developed the Use Case Diagram.
* Defined user interactions and system workflows.
* Identified access privileges for different user roles.

#### UI/UX Design

* Created low-fidelity wireframes for core modules.
* Planned reusable UI components.
* Defined the overall user interface structure and navigation flow.

#### Backend Development

* Initialized the backend project structure.
* Configured database connectivity.
* Implemented JWT-based authentication.
* Developed user registration and login APIs.

#### Frontend Development

* Initialized React application using Vite.
* Configured Tailwind CSS.
* Developed the Login Page user interface.
* Implemented authentication state management using AuthContext.
* Connected frontend authentication forms with backend APIs.

#### Security & Routing

* Implemented protected routing.
* Planned role-based access control architecture.
* Established the authentication workflow for the application.

### Deliverables Completed

* ER Diagram
* Use Case Diagram
* Low-Fidelity Wireframes
* UI Design System
* Backend Project Setup
* Database Connectivity
* JWT Authentication
* Login & Registration APIs
* React Frontend Setup
* Tailwind CSS Configuration
* Authentication Context
* Protected Routes

### Outcome

By the end of the week, the complete design phase was finalized and the authentication foundation of the application was successfully established. The project is now ready to move into module development, beginning with Employee Management and Project Management in the upcoming week.

# Week 6 Progress Report

## Duration: 22 June 2026 – 28 June 2026

### Objectives

The objective of this week was to implement the core business modules of the Company Operations Management System by developing the Employee Management and Project Management functionalities. The focus was on creating reusable backend APIs, integrating them with the frontend, and establishing seamless interaction between the application layers.

### Activities Performed

#### Employee Management Module

* Developed the Employee Management module.
* Implemented functionality to add, update, view, and delete employee records.
* Integrated employee data with the MongoDB database.
* Added search and filtering capabilities for efficient employee management.
* Created responsive interfaces for employee-related operations.

#### Project Management Module

* Developed the Project Management module.
* Implemented project creation, editing, and deletion functionalities.
* Designed workflows for assigning employees to projects.
* Managed project status and project-related information.
* Established relationships between employees and projects.

#### Backend Development

* Developed RESTful APIs for employee and project management.
* Implemented controller logic and route handling.
* Connected application modules with the database using Mongoose models.
* Added request validation and error handling for API operations.

#### Frontend Development

* Developed user interfaces for Employee Management and Project Management modules.
* Integrated frontend components with backend APIs.
* Implemented dynamic data rendering using React.
* Improved navigation between different management modules.
* Enhanced overall user experience through responsive layouts.

#### Database Integration

* Connected employee and project modules with MongoDB.
* Verified CRUD operations across both modules.
* Validated relationships between employees and assigned projects.

### Deliverables Completed

* Employee Management Module
* Project Management Module
* Employee CRUD Operations
* Project CRUD Operations
* Employee Search & Filtering
* Employee–Project Association
* Backend APIs for Employee & Project Modules
* Frontend Integration
* Database Integration
* API Validation and Error Handling

### Outcome

By the end of the week, the Employee Management and Project Management modules were successfully implemented and integrated with both the frontend and backend. The application now supports efficient management of employee and project information, establishing the core operational functionality of the system. This milestone prepares the project for the implementation of Task Management, Leave Management, Notifications, and Dashboard Analytics in the following development phase.

## Week 7 Progress Report

## Duration: 29 June 2026 – 05 July 2026

### Objectives

The objective of this week was to implement the Task Management and
Leave Management modules of the Company Operations Management System,
along with resolving a token expiry issue identified during the previous
week's testing. The focus was on building fine-grained role-based access
control, creating an intuitive Kanban-style task board, and developing
a dual-view leave management interface that adapts based on the
logged-in user's role.

### Activities Performed

#### Bug Fix — Token Expiry Handling

* Identified a gap where expired or missing tokens were not redirecting
  users to the login page.
* Implemented a response interceptor in the centralized axios instance
  to automatically detect 401 Unauthorized responses.
* Configured the interceptor to clear localStorage and redirect to the
  login page on token expiry, ensuring consistent session handling
  across all modules.

#### Task Management Module

* Developed the Task Management module with full CRUD functionality.
* Implemented fine-grained role-based access control — Admin and Manager
  have full access, while Employees can only update the status of tasks
  assigned specifically to them.
* Built a Kanban-style three-column board (To Do, In Progress, Done)
  for visual task tracking.
* Developed reusable TaskCard and TaskColumn components for displaying
  tasks grouped by status.
* Created a Task Detail modal supporting inline status updates.
* Built a Create and Edit Task form modal with dynamic Project and
  Employee dropdowns.
* Integrated Project-based filtering to allow users to view tasks
  belonging to a specific project.
* Connected all frontend components with backend APIs.

#### Leave Management Module

* Developed the Leave Management module with apply, approve, reject,
  and cancel functionalities.
* Implemented server-side date overlap detection to prevent duplicate
  leave requests for the same date range.
* Built a single LeavePage component that renders two different views
  based on the logged-in user's role.
* Employee view includes a personal leave history table, an Apply for
  Leave modal, and a Cancel option for pending requests.
* Manager and Admin view includes a full tabbed approval interface with
  tab filters (All, Pending, Approved, Rejected) and Approve and Reject
  action buttons per request.
* Displayed the reviewer's name after a leave request is actioned.

#### Backend Development

* Developed RESTful APIs for Task Management and Leave Management.
* Implemented ownership-based access control in the Task update
  controller to restrict Employee access to their own tasks only.
* Built separate approve and reject endpoints for leave requests rather
  than a generic status update endpoint, ensuring clear and explicit
  action handling.
* Added validation for date ranges, duplicate leave detection, and
  status-based restrictions on actions.
* Connected all new modules to the Express server with appropriate
  route and middleware configuration.

#### Frontend Development

* Built Kanban board layout with three status columns and task count
  indicators per column.
* Developed a dual-view Leave page that dynamically renders the correct
  interface based on user role without requiring separate routes.
* Reused existing shared components (ConfirmDeleteModal, DashboardLayout,
  centralized axios instance) across new modules for consistency.
* Added leave status badge and day calculator utility functions to keep
  business logic separate from UI components.

#### Testing

* Conducted a full manual regression pass across both new modules for
  all three roles (Admin, Manager, Employee).
* Verified that role-based UI restrictions matched backend access control
  exactly across all task and leave actions.
* Re-verified the token expiry redirect fix across all protected pages.
* Tested edge cases including overlapping leave dates, status-only task
  updates by employees, and leave cancellation restrictions on
  non-pending requests.

### Deliverables Completed

* Token Expiry Response Interceptor
* Task Management Module
* Leave Management Module
* Task CRUD Operations
* Kanban Board Interface
* Task Detail Modal with Inline Status Update
* Task Create and Edit Form Modal
* Leave Apply, Approve, Reject and Cancel Functionality
* Dual-View Leave Page (Employee and Manager/Admin)
* Tab Filtering for Leave Requests
* Backend APIs for Task and Leave Modules
* Frontend Integration for Both Modules
* Role-Based Access Control Across Task and Leave Modules
* Edge Case Validation and Error Handling

### Outcome

By the end of the week, the Task Management and Leave Management modules
were successfully implemented and integrated with both the frontend and
backend. The application now supports complete task tracking through a
visual Kanban board and a structured leave approval workflow with
role-appropriate interfaces. The token expiry issue from the previous
week was also resolved, ensuring stable session management across the
entire application. This milestone prepares the project for the
implementation of the Notification System, Dashboard Analytics,
Testing, and Deployment in the remaining weeks.

# Week 8 Progress Report

## Duration: 06 July 2026 – 12 July 2026

### Objectives

The objective of this week was to implement the Notification System
and Dashboard Analytics modules, complete all previously placeholder
sections across existing pages, and polish the overall user interface
in preparation for final testing and deployment in the upcoming week.

### Activities Performed

#### Notification System

* Developed the Notification model with type categorisation and read
  status tracking.
* Built a reusable notification helper utility that creates notification
  records automatically when key events occur across the application.
* Wired automatic notification creation into the Task, Project and Leave
  controllers so that notifications are triggered on task assignment,
  project member assignment, and leave approval or rejection without
  any manual intervention.
* Built the NotificationBell component with a live unread count badge,
  a dropdown panel showing the five most recent notifications with
  colour-coded type indicators and time-ago display, and automatic
  polling every thirty seconds to keep the count current.
* Built the full Notifications page with All, Unread and Read tab
  filters, individual mark as read, mark all as read, and delete
  functionality.
* Added Notifications as a dedicated link in the sidebar navigation
  alongside the existing bell icon in the navbar.

#### Dashboard and Analytics

* Built a role-based Dashboard Statistics API with three separate
  endpoints returning aggregated counts and data breakdowns using
  MongoDB aggregation pipelines.
* Integrated Chart.js and react-chartjs-2 and built reusable DonutChart
  and BarChart wrapper components to keep chart rendering logic
  separate from page components.
* Built the Admin Dashboard with four summary cards showing total
  employees, active projects, pending leave requests and unread
  notifications, four Chart.js visualisations covering employees by
  department, projects by status, tasks by status and leave requests
  by status, and a recent leave requests table.
* Built the Manager Dashboard with three summary cards, a task status
  donut chart, a project status bar chart and a recent projects list
  scoped to projects created by the logged-in manager.
* Built the Employee Dashboard with four summary cards, a task status
  donut chart, a task priority donut chart, a recent tasks list with
  priority badges and a personal assigned projects list.

#### Profile and Detail Page Completion

* Completed the Employee Profile page by replacing all three placeholder
  sections with real live data — assigned projects derived from task
  assignments, recent tasks with priority and status indicators, and
  leave history with status badges and date ranges.
* Added three summary count cards to the Employee Profile page showing
  total tasks with a status breakdown, total assigned projects and total
  leave requests with pending and approved counts.
* Completed the Project Detail page by replacing hardcoded zero counts
  with live task status counts fetched from the database and adding a
  full Project Tasks table showing all tasks belonging to the project
  with assignee name, priority badge, status and due date.
* Added employee-specific and project-specific task and leave endpoints
  to the backend to support the profile and detail page data requirements.

#### UI Polish

* Updated the Navbar with a user avatar circle showing the first initial
  of the logged-in user, a colour-coded role badge distinguishing Admin,
  Manager and Employee roles visually, and a click-outside-to-close
  user dropdown menu replacing the plain logout button.
* Fixed the browser tab title from the Vite default placeholder to the
  correct application name.
* Confirmed consistent loading states and empty states across all pages
  in the application.

#### Documentation

* Completed the Software Requirements Specification document covering
  all functional requirements across seven modules, non-functional
  requirements and the full technology stack.

### Deliverables Completed

* Notification Model and Helper Utility
* Automatic Notification Triggers on Task, Project and Leave Events
* Notification Bell Dropdown with Unread Count and Auto-Polling
* Full Notifications Page with Tab Filtering and Read Management
* Dashboard Statistics API with Role-Based Aggregated Data
* Reusable DonutChart and BarChart Components
* Admin Dashboard with Four Chart.js Visualisations
* Manager Dashboard with Project and Task Charts
* Employee Dashboard with Personal Task and Leave Statistics
* Employee Profile with Real Project, Task and Leave Data
* Project Detail with Live Task Count and Tasks Table
* Polished Navbar with Avatar Circle and Role Badge
* Software Requirements Specification Document

### Outcome

By the end of the week, the Notification System and Dashboard Analytics
modules were fully implemented, completing the core feature development
phase of the project. All previously placeholder sections across the
Employee Profile and Project Detail pages were replaced with real live
data, bringing the application to a fully functional state across all
modules. The user interface was polished with consistent navigation,
role-appropriate dashboards with visual analytics, and a refined navbar.
The project is now ready to move into the final phase covering test case
documentation, deployment to Vercel and Render, user manual preparation,
and presentation readiness in Week 9.