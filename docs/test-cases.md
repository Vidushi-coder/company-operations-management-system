# Test Cases

**Project Name:** Company Operations Management System
**Author:** Vidushi Gupta
**Last Updated:** July 2026
**Version:** 1.0

---

## Overview

This document contains the manual test cases executed for the Company
Operations Management System. All test cases were executed manually
across three user roles: Admin, Manager and Employee. Each test case
records the test ID, module, description, preconditions, test steps,
expected result, actual result and pass/fail status.

---

## Test Environment

| Item | Details |
|------|---------|
| Frontend URL | http://localhost:5173 |
| Backend URL | http://localhost:5000 |
| Database | MongoDB Atlas (company-ops-db) |
| Browser | Google Chrome |
| Testing Tool | Postman (API testing), Browser (UI testing) |

---

## User Accounts Used for Testing

| Role | Name | Email |
|------|------|-------|
| Admin | Vidushi Gupta | vidushigupta@gmail.com |
| Manager | Arjun Mehta | arjun@company.com |
| Employee | Riya Sharma | riyasharma78@gmail.com |
| Employee | Karan Verma | karan@company.com |

---

## Module 1 — Authentication

### TC-01: Valid Login

| Field | Details |
|-------|---------|
| **Test ID** | TC-01 |
| **Module** | Authentication |
| **Description** | User logs in with valid credentials |
| **Preconditions** | User account exists in the database |
| **Test Steps** | 1. Navigate to /login. 2. Enter valid email and password. 3. Click Login. |
| **Expected Result** | User is redirected to their role-based dashboard |
| **Actual Result** | Admin redirected to /admin-dashboard, Manager to /manager-dashboard, Employee to /employee-dashboard |
| **Status** | ✅ Pass |

---

### TC-02: Invalid Password

| Field | Details |
|-------|---------|
| **Test ID** | TC-02 |
| **Module** | Authentication |
| **Description** | User logs in with incorrect password |
| **Preconditions** | User account exists in the database |
| **Test Steps** | 1. Navigate to /login. 2. Enter valid email and incorrect password. 3. Click Login. |
| **Expected Result** | Error message "Invalid email or password" displayed, fields not cleared |
| **Actual Result** | Error message displayed correctly, password field retained value |
| **Status** | ✅ Pass |

---

### TC-03: Empty Fields Submission

| Field | Details |
|-------|---------|
| **Test ID** | TC-03 |
| **Module** | Authentication |
| **Description** | User submits login form with empty fields |
| **Preconditions** | None |
| **Test Steps** | 1. Navigate to /login. 2. Leave email and password empty. 3. Click Login. |
| **Expected Result** | HTML5 validation prevents submission, required field indicators shown |
| **Actual Result** | Browser prevented form submission and highlighted empty fields |
| **Status** | ✅ Pass |

---

### TC-04: Token Expiry Redirect

| Field | Details |
|-------|---------|
| **Test ID** | TC-04 |
| **Module** | Authentication |
| **Description** | Expired or deleted token redirects user to login |
| **Preconditions** | User is logged in and on a protected page |
| **Test Steps** | 1. Log in as any role. 2. Open DevTools → Application → Local Storage. 3. Delete the token key. 4. Trigger any API call by searching or filtering. |
| **Expected Result** | User is automatically redirected to /login |
| **Actual Result** | Redirect to /login occurred immediately after the 401 response |
| **Status** | ✅ Pass |

---

### TC-05: Protected Route Without Login

| Field | Details |
|-------|---------|
| **Test ID** | TC-05 |
| **Module** | Authentication |
| **Description** | Unauthenticated user cannot access protected pages |
| **Preconditions** | User is not logged in |
| **Test Steps** | 1. Open browser in incognito mode. 2. Navigate directly to /employees. |
| **Expected Result** | User is redirected to /login |
| **Actual Result** | Redirected to /login by ProtectedRoute component |
| **Status** | ✅ Pass |

---

## Module 2 — Employee Management

### TC-06: Add Employee (Admin)

| Field | Details |
|-------|---------|
| **Test ID** | TC-06 |
| **Module** | Employee Management |
| **Description** | Admin adds a new employee |
| **Preconditions** | Logged in as Admin |
| **Test Steps** | 1. Navigate to /employees. 2. Click + Add Employee. 3. Fill all fields with valid data. 4. Click Save. |
| **Expected Result** | Employee appears in the table immediately, linked User account created in database |
| **Actual Result** | Employee row appeared in table without page refresh, both Employee and User documents created in MongoDB |
| **Status** | ✅ Pass |

---

### TC-07: Duplicate Email on Employee Creation

| Field | Details |
|-------|---------|
| **Test ID** | TC-07 |
| **Module** | Employee Management |
| **Description** | Admin tries to add an employee with an email that already exists |
| **Preconditions** | Logged in as Admin, employee with the email already exists |
| **Test Steps** | 1. Click + Add Employee. 2. Enter an email that already exists in the system. 3. Fill remaining fields. 4. Click Save. |
| **Expected Result** | Error message "A user with this email already exists" shown in modal |
| **Actual Result** | Error message displayed correctly inside the modal |
| **Status** | ✅ Pass |

---

### TC-08: Edit Employee (Admin)

| Field | Details |
|-------|---------|
| **Test ID** | TC-08 |
| **Module** | Employee Management |
| **Description** | Admin edits an existing employee's details |
| **Preconditions** | Logged in as Admin, at least one employee exists |
| **Test Steps** | 1. Click the Edit icon on any employee row. 2. Change the designation field. 3. Click Save. |
| **Expected Result** | Table updates with new designation, Name and Email fields were greyed out and uneditable in edit mode |
| **Actual Result** | Designation updated correctly, Name and Email were disabled as designed |
| **Status** | ✅ Pass |

---

### TC-09: Delete Employee (Admin)

| Field | Details |
|-------|---------|
| **Test ID** | TC-09 |
| **Module** | Employee Management |
| **Description** | Admin deletes an employee |
| **Preconditions** | Logged in as Admin, at least one employee exists |
| **Test Steps** | 1. Click the Delete icon on any employee row. 2. Confirm deletion in the confirmation modal. |
| **Expected Result** | Employee removed from table, both Employee and linked User documents deleted from MongoDB |
| **Actual Result** | Row disappeared from table, verified in MongoDB Atlas that both documents were deleted |
| **Status** | ✅ Pass |

---

### TC-10: Employee Cannot Add or Delete

| Field | Details |
|-------|---------|
| **Test ID** | TC-10 |
| **Module** | Employee Management |
| **Description** | Employee role cannot see Add, Edit or Delete controls |
| **Preconditions** | Logged in as Employee |
| **Test Steps** | 1. Navigate to /employees. |
| **Expected Result** | + Add Employee button hidden, Edit and Delete icons hidden, only View icon visible |
| **Actual Result** | Page showed only the View (👁) icon per row, no Add button present |
| **Status** | ✅ Pass |

---

### TC-11: Search Employee by Name

| Field | Details |
|-------|---------|
| **Test ID** | TC-11 |
| **Module** | Employee Management |
| **Description** | Search bar filters employees by name |
| **Preconditions** | Logged in as Admin or Manager, multiple employees exist |
| **Test Steps** | 1. Type a partial name in the search bar. 2. Click Apply Filters. |
| **Expected Result** | Only employees whose names contain the search term are shown |
| **Actual Result** | Table filtered correctly showing only matching employees |
| **Status** | ✅ Pass |

---

### TC-12: Filter Employee by Department and Status

| Field | Details |
|-------|---------|
| **Test ID** | TC-12 |
| **Module** | Employee Management |
| **Description** | Dropdown filters narrow down the employee list |
| **Preconditions** | Logged in as Admin or Manager, multiple employees exist |
| **Test Steps** | 1. Select a department from the dropdown. 2. Select a status. 3. Click Apply Filters. |
| **Expected Result** | Only employees matching both filters are shown |
| **Actual Result** | Filtered correctly by department and status |
| **Status** | ✅ Pass |

---

### TC-13: View Employee Profile

| Field | Details |
|-------|---------|
| **Test ID** | TC-13 |
| **Module** | Employee Management |
| **Description** | Clicking View Profile shows employee details with real data |
| **Preconditions** | Employee has assigned tasks and leave requests |
| **Test Steps** | 1. Click the View icon on an employee row. |
| **Expected Result** | Profile page shows personal details, assigned projects, recent tasks and leave history with real data |
| **Actual Result** | All three sections populated with live data from the database |
| **Status** | ✅ Pass |

---

## Module 3 — Project Management

### TC-14: Create Project (Admin/Manager)

| Field | Details |
|-------|---------|
| **Test ID** | TC-14 |
| **Module** | Project Management |
| **Description** | Admin creates a new project |
| **Preconditions** | Logged in as Admin or Manager |
| **Test Steps** | 1. Navigate to /projects. 2. Click + Create New Project. 3. Fill all fields. 4. Click Create Project. |
| **Expected Result** | New project card appears in the grid immediately |
| **Actual Result** | Project card appeared correctly with status badge and deadline |
| **Status** | ✅ Pass |

---

### TC-15: Deadline Before Start Date Validation

| Field | Details |
|-------|---------|
| **Test ID** | TC-15 |
| **Module** | Project Management |
| **Description** | Frontend validates that deadline cannot be before start date |
| **Preconditions** | Logged in as Admin or Manager |
| **Test Steps** | 1. Open Create Project form. 2. Set deadline to a date before the start date. 3. Click Create Project. |
| **Expected Result** | Error message "Deadline cannot be earlier than the start date" shown, no API call made |
| **Actual Result** | Frontend validation caught the error correctly before submission |
| **Status** | ✅ Pass |

---

### TC-16: Employee Cannot Create Project

| Field | Details |
|-------|---------|
| **Test ID** | TC-16 |
| **Module** | Project Management |
| **Description** | Employee role cannot see the Create New Project button |
| **Preconditions** | Logged in as Employee |
| **Test Steps** | 1. Navigate to /projects. |
| **Expected Result** | + Create New Project button is not visible |
| **Actual Result** | Button was completely absent from the page |
| **Status** | ✅ Pass |

---

### TC-17: Overdue Status Computed Automatically

| Field | Details |
|-------|---------|
| **Test ID** | TC-17 |
| **Module** | Project Management |
| **Description** | Projects past their deadline show Overdue status automatically |
| **Preconditions** | A project exists with a deadline in the past and status not Completed |
| **Test Steps** | 1. Navigate to /projects. 2. Observe status badge on projects with past deadlines. |
| **Expected Result** | Projects with past deadlines show red Overdue badge regardless of stored status |
| **Actual Result** | Overdue badge computed correctly on the frontend from deadline date |
| **Status** | ✅ Pass |

---

### TC-18: Assign Member to Project

| Field | Details |
|-------|---------|
| **Test ID** | TC-18 |
| **Module** | Project Management |
| **Description** | Admin assigns an employee to a project |
| **Preconditions** | Logged in as Admin, project and employee both exist |
| **Test Steps** | 1. Open a project's detail page. 2. Click + Assign Member. 3. Select an employee. 4. Click Assign. |
| **Expected Result** | Employee appears in the Assigned Members list |
| **Actual Result** | Member list updated immediately after assignment |
| **Status** | ✅ Pass |

---

### TC-19: Prevent Duplicate Member Assignment

| Field | Details |
|-------|---------|
| **Test ID** | TC-19 |
| **Module** | Project Management |
| **Description** | Already assigned employees are excluded from the Assign Member dropdown |
| **Preconditions** | At least one employee is already assigned to the project |
| **Test Steps** | 1. Open Assign Member modal on a project that has all employees assigned. |
| **Expected Result** | Dropdown shows no available employees, "All employees are already assigned" message shown, Assign button disabled |
| **Actual Result** | Dropdown was empty with the message and disabled button as expected |
| **Status** | ✅ Pass |

---

### TC-20: Remove Member from Project

| Field | Details |
|-------|---------|
| **Test ID** | TC-20 |
| **Module** | Project Management |
| **Description** | Admin removes an employee from a project |
| **Preconditions** | Logged in as Admin, at least one member assigned |
| **Test Steps** | 1. Open project detail page. 2. Click Remove next to a member. |
| **Expected Result** | Member removed immediately from the list without confirmation modal |
| **Actual Result** | Member disappeared from the list instantly |
| **Status** | ✅ Pass |

---

### TC-21: Project Detail Shows Live Task Counts

| Field | Details |
|-------|---------|
| **Test ID** | TC-21 |
| **Module** | Project Management |
| **Description** | Tasks Overview section shows real task counts per status |
| **Preconditions** | Project has tasks assigned to it |
| **Test Steps** | 1. Open a project detail page. 2. Observe the Tasks Overview section. |
| **Expected Result** | To Do, In Progress and Done counts reflect actual task data |
| **Actual Result** | Live counts displayed correctly alongside a full tasks table |
| **Status** | ✅ Pass |

---

## Module 4 — Task Management

### TC-22: Create Task (Admin/Manager)

| Field | Details |
|-------|---------|
| **Test ID** | TC-22 |
| **Module** | Task Management |
| **Description** | Admin creates a new task assigned to an employee |
| **Preconditions** | Logged in as Admin, at least one project and one employee exist |
| **Test Steps** | 1. Navigate to /tasks. 2. Click + Create New Task. 3. Select project, assign to employee, fill fields. 4. Click Create Task. |
| **Expected Result** | Task card appears in the To Do column immediately |
| **Actual Result** | Task card appeared in the correct column with priority badge and assignee name |
| **Status** | ✅ Pass |

---

### TC-23: Task Assigned Notification Created

| Field | Details |
|-------|---------|
| **Test ID** | TC-23 |
| **Module** | Task Management / Notifications |
| **Description** | Creating a task automatically notifies the assigned employee |
| **Preconditions** | Logged in as Admin, employee has a linked User account |
| **Test Steps** | 1. Create a task assigned to Riya Sharma. 2. Log in as Riya. 3. Check notifications. |
| **Expected Result** | Notification of type "Task Assigned" visible in Riya's notifications |
| **Actual Result** | Notification appeared with correct message and isRead: false |
| **Status** | ✅ Pass |

---

### TC-24: Employee Updates Own Task Status

| Field | Details |
|-------|---------|
| **Test ID** | TC-24 |
| **Module** | Task Management |
| **Description** | Employee can update the status of their own assigned task |
| **Preconditions** | Logged in as Employee, at least one task assigned to them |
| **Test Steps** | 1. Navigate to /tasks. 2. Click on own task card. 3. Change status dropdown. 4. Click Update. |
| **Expected Result** | Task moves to the new column, status updated successfully |
| **Actual Result** | Task card moved to the correct column after status update |
| **Status** | ✅ Pass |

---

### TC-25: Employee Cannot Update Another Employee's Task

| Field | Details |
|-------|---------|
| **Test ID** | TC-25 |
| **Module** | Task Management |
| **Description** | Employee is blocked from updating a task not assigned to them |
| **Preconditions** | Logged in as Employee, another employee's task exists |
| **Test Steps** | 1. Send PUT /api/tasks/:id with another employee's task ID using Employee token. |
| **Expected Result** | 403 Forbidden — "Access denied, this task is not assigned to you" |
| **Actual Result** | 403 response returned correctly |
| **Status** | ✅ Pass |

---

### TC-26: Employee Cannot Update Fields Other Than Status

| Field | Details |
|-------|---------|
| **Test ID** | TC-26 |
| **Module** | Task Management |
| **Description** | Employee attempting to update priority alongside status is rejected |
| **Preconditions** | Logged in as Employee via Postman |
| **Test Steps** | 1. Send PUT /api/tasks/:id with body containing both status and priority fields using Employee token. |
| **Expected Result** | 403 Forbidden — "You can only update the status of your assigned tasks" |
| **Actual Result** | 403 response returned correctly |
| **Status** | ✅ Pass |

---

### TC-27: Employee Sees Only Own Tasks

| Field | Details |
|-------|---------|
| **Test ID** | TC-27 |
| **Module** | Task Management |
| **Description** | Employee's Kanban board shows only tasks assigned to them |
| **Preconditions** | Multiple employees have tasks assigned to them |
| **Test Steps** | 1. Log in as Riya. 2. Navigate to /tasks. |
| **Expected Result** | Only Riya's tasks visible, Karan's tasks not shown |
| **Actual Result** | Only Riya's assigned tasks appeared on the board |
| **Status** | ✅ Pass |

---

### TC-28: Employee Cannot Create or Delete Tasks

| Field | Details |
|-------|---------|
| **Test ID** | TC-28 |
| **Module** | Task Management |
| **Description** | Employee role cannot see Create Task button or Delete button |
| **Preconditions** | Logged in as Employee |
| **Test Steps** | 1. Navigate to /tasks. 2. Click on any task card. |
| **Expected Result** | + Create New Task button hidden, Edit and Delete buttons hidden in task detail modal |
| **Actual Result** | Both buttons were absent for Employee role |
| **Status** | ✅ Pass |

---

### TC-29: Project Filter on Task Board

| Field | Details |
|-------|---------|
| **Test ID** | TC-29 |
| **Module** | Task Management |
| **Description** | Filtering by project shows only tasks belonging to that project |
| **Preconditions** | Tasks exist across multiple projects |
| **Test Steps** | 1. Navigate to /tasks. 2. Select a project from the dropdown. |
| **Expected Result** | Only tasks for the selected project appear on the board |
| **Actual Result** | Board updated correctly to show only the selected project's tasks |
| **Status** | ✅ Pass |

---

## Module 5 — Leave Management

### TC-30: Employee Applies for Leave

| Field | Details |
|-------|---------|
| **Test ID** | TC-30 |
| **Module** | Leave Management |
| **Description** | Employee submits a leave request |
| **Preconditions** | Logged in as Employee with a linked Employee profile |
| **Test Steps** | 1. Navigate to /leave. 2. Click + Apply for Leave. 3. Select leave type, dates and reason. 4. Click Submit. |
| **Expected Result** | Leave request appears in the table with Pending status |
| **Actual Result** | New row appeared immediately with yellow Pending badge |
| **Status** | ✅ Pass |

---

### TC-31: End Date Before Start Date Validation

| Field | Details |
|-------|---------|
| **Test ID** | TC-31 |
| **Module** | Leave Management |
| **Description** | System prevents leave requests where end date is before start date |
| **Preconditions** | Logged in as Employee |
| **Test Steps** | 1. Open Apply for Leave modal. 2. Set To Date before From Date. 3. Click Submit. |
| **Expected Result** | Frontend error "End date cannot be before start date" shown, no API call made |
| **Actual Result** | Error displayed correctly without hitting the backend |
| **Status** | ✅ Pass |

---

### TC-32: Overlapping Leave Request Rejected

| Field | Details |
|-------|---------|
| **Test ID** | TC-32 |
| **Module** | Leave Management |
| **Description** | System prevents overlapping leave requests |
| **Preconditions** | Employee already has a Pending or Approved leave request for certain dates |
| **Test Steps** | 1. Apply for leave on dates that overlap an existing request. 2. Click Submit. |
| **Expected Result** | Error "You already have a leave request for overlapping dates" shown |
| **Actual Result** | Backend returned the overlap error correctly |
| **Status** | ✅ Pass |

---

### TC-33: Employee Cancels Pending Leave

| Field | Details |
|-------|---------|
| **Test ID** | TC-33 |
| **Module** | Leave Management |
| **Description** | Employee cancels their own pending leave request |
| **Preconditions** | Employee has a Pending leave request |
| **Test Steps** | 1. Navigate to /leave. 2. Click Cancel on a Pending row. |
| **Expected Result** | Row disappears from the table |
| **Actual Result** | Row removed immediately without page refresh |
| **Status** | ✅ Pass |

---

### TC-34: Employee Cannot Cancel Approved Leave

| Field | Details |
|-------|---------|
| **Test ID** | TC-34 |
| **Module** | Leave Management |
| **Description** | Cancel button is hidden for Approved or Rejected leaves |
| **Preconditions** | Employee has both Pending and Approved leave requests |
| **Test Steps** | 1. Navigate to /leave as Employee. 2. Observe the Action column for each row. |
| **Expected Result** | Cancel button shown only for Pending rows, absent for Approved and Rejected |
| **Actual Result** | Cancel button only appeared on Pending rows |
| **Status** | ✅ Pass |

---

### TC-35: Admin Approves Leave

| Field | Details |
|-------|---------|
| **Test ID** | TC-35 |
| **Module** | Leave Management |
| **Description** | Admin approves a pending leave request |
| **Preconditions** | Logged in as Admin, a Pending leave request exists |
| **Test Steps** | 1. Navigate to /leave. 2. Click Approve on a Pending row. |
| **Expected Result** | Row status changes to Approved, Reviewed By column populates with Admin name |
| **Actual Result** | Status badge changed to green Approved, reviewer name appeared |
| **Status** | ✅ Pass |

---

### TC-36: Admin Rejects Leave

| Field | Details |
|-------|---------|
| **Test ID** | TC-36 |
| **Module** | Leave Management |
| **Description** | Admin rejects a pending leave request |
| **Preconditions** | Logged in as Admin, a Pending leave request exists |
| **Test Steps** | 1. Navigate to /leave. 2. Click Reject on a Pending row. |
| **Expected Result** | Row status changes to Rejected, Reviewed By column populates |
| **Actual Result** | Status badge changed to red Rejected, reviewer name appeared |
| **Status** | ✅ Pass |

---

### TC-37: Leave Approved Notification Created

| Field | Details |
|-------|---------|
| **Test ID** | TC-37 |
| **Module** | Leave Management / Notifications |
| **Description** | Approving a leave automatically notifies the employee |
| **Preconditions** | Admin approves Riya's leave request |
| **Test Steps** | 1. Approve Riya's leave as Admin. 2. Log in as Riya. 3. Check notifications. |
| **Expected Result** | Notification of type "Leave Approved" visible in Riya's notifications |
| **Actual Result** | Notification appeared with correct message |
| **Status** | ✅ Pass |

---

### TC-38: Double Approval Prevented

| Field | Details |
|-------|---------|
| **Test ID** | TC-38 |
| **Module** | Leave Management |
| **Description** | System prevents approving an already approved request |
| **Preconditions** | A leave request has already been approved |
| **Test Steps** | 1. Send PUT /api/leave/:id/approve again for an already approved leave via Postman. |
| **Expected Result** | 400 response — "This request has already been approved" |
| **Actual Result** | 400 error returned correctly |
| **Status** | ✅ Pass |

---

### TC-39: Employee Cannot See Other Employees' Leaves

| Field | Details |
|-------|---------|
| **Test ID** | TC-39 |
| **Module** | Leave Management |
| **Description** | Employee leave page shows only their own requests |
| **Preconditions** | Multiple employees have leave requests |
| **Test Steps** | 1. Log in as Riya. 2. Navigate to /leave. |
| **Expected Result** | Only Riya's leave requests visible, tab filters not shown |
| **Actual Result** | Page showed My Leave heading with only Riya's requests, no tab filters |
| **Status** | ✅ Pass |

---

## Module 6 — Notification System

### TC-40: Unread Count on Bell Icon

| Field | Details |
|-------|---------|
| **Test ID** | TC-40 |
| **Module** | Notifications |
| **Description** | Bell icon shows correct unread notification count |
| **Preconditions** | Logged in as Employee with unread notifications |
| **Test Steps** | 1. Log in as Riya after receiving notifications. 2. Observe the bell icon in the navbar. |
| **Expected Result** | Red badge on bell shows the correct number of unread notifications |
| **Actual Result** | Badge count matched the number of unread notifications in the database |
| **Status** | ✅ Pass |

---

### TC-41: Bell Dropdown Opens and Closes

| Field | Details |
|-------|---------|
| **Test ID** | TC-41 |
| **Module** | Notifications |
| **Description** | Bell icon opens dropdown on click and closes on outside click |
| **Preconditions** | Logged in as any role |
| **Test Steps** | 1. Click the bell icon. 2. Click anywhere outside the dropdown. |
| **Expected Result** | Dropdown opens on click, closes when clicking outside |
| **Actual Result** | Both open and close behaviors worked correctly |
| **Status** | ✅ Pass |

---

### TC-42: Mark Single Notification as Read

| Field | Details |
|-------|---------|
| **Test ID** | TC-42 |
| **Module** | Notifications |
| **Description** | Clicking a notification or Mark read marks it as read |
| **Preconditions** | At least one unread notification exists |
| **Test Steps** | 1. Navigate to /notifications. 2. Click Mark read on an unread notification. |
| **Expected Result** | Notification moves to Read tab, unread count decreases by 1 |
| **Actual Result** | Notification updated to read, count decreased correctly |
| **Status** | ✅ Pass |

---

### TC-43: Mark All Notifications as Read

| Field | Details |
|-------|---------|
| **Test ID** | TC-43 |
| **Module** | Notifications |
| **Description** | Mark All as Read button marks all unread notifications as read |
| **Preconditions** | Multiple unread notifications exist |
| **Test Steps** | 1. Navigate to /notifications. 2. Click Mark All as Read. |
| **Expected Result** | All notifications move to Read tab, unread count becomes 0, bell badge disappears |
| **Actual Result** | All notifications marked read, badge disappeared from navbar |
| **Status** | ✅ Pass |

---

### TC-44: Delete Notification

| Field | Details |
|-------|---------|
| **Test ID** | TC-44 |
| **Module** | Notifications |
| **Description** | User deletes a notification |
| **Preconditions** | At least one notification exists |
| **Test Steps** | 1. Navigate to /notifications. 2. Click Delete on any notification. |
| **Expected Result** | Notification removed from the list immediately |
| **Actual Result** | Notification disappeared without page refresh |
| **Status** | ✅ Pass |

---

### TC-45: User Cannot Read Another User's Notification

| Field | Details |
|-------|---------|
| **Test ID** | TC-45 |
| **Module** | Notifications |
| **Description** | Attempting to mark another user's notification as read returns 404 |
| **Preconditions** | Two user accounts with separate notifications |
| **Test Steps** | 1. Copy a notification ID from Riya's account. 2. Try marking it as read using Admin token via Postman. |
| **Expected Result** | 404 — "Notification not found" |
| **Actual Result** | 404 returned correctly since userId did not match |
| **Status** | ✅ Pass |

---

## Module 7 — Dashboard and Analytics

### TC-46: Admin Dashboard Loads with Real Data

| Field | Details |
|-------|---------|
| **Test ID** | TC-46 |
| **Module** | Dashboard |
| **Description** | Admin dashboard shows correct summary cards and charts |
| **Preconditions** | Logged in as Admin, data exists across all modules |
| **Test Steps** | 1. Log in as Admin. 2. Observe the dashboard at /admin-dashboard. |
| **Expected Result** | Four summary cards show correct counts, four Chart.js charts render with data |
| **Actual Result** | All cards and charts loaded with accurate live data |
| **Status** | ✅ Pass |

---

### TC-47: Manager Dashboard Shows Scoped Data

| Field | Details |
|-------|---------|
| **Test ID** | TC-47 |
| **Module** | Dashboard |
| **Description** | Manager dashboard shows only projects created by that manager |
| **Preconditions** | Logged in as Manager |
| **Test Steps** | 1. Log in as Manager. 2. Observe My Projects count and Recent Projects list. |
| **Expected Result** | Only projects created by this manager are counted and listed |
| **Actual Result** | Project count and list matched only the manager's own projects |
| **Status** | ✅ Pass |

---

### TC-48: Employee Dashboard Shows Personal Data

| Field | Details |
|-------|---------|
| **Test ID** | TC-48 |
| **Module** | Dashboard |
| **Description** | Employee dashboard shows only their own tasks and projects |
| **Preconditions** | Logged in as Employee with assigned tasks |
| **Test Steps** | 1. Log in as Riya. 2. Observe the dashboard at /employee-dashboard. |
| **Expected Result** | Task charts and lists show only Riya's tasks, projects derived from her task assignments |
| **Actual Result** | All data scoped to Riya's assignments correctly |
| **Status** | ✅ Pass |

---

### TC-49: Charts Show No Data Available When Empty

| Field | Details |
|-------|---------|
| **Test ID** | TC-49 |
| **Module** | Dashboard |
| **Description** | Charts gracefully handle empty data |
| **Preconditions** | A role with no relevant data (e.g. Manager with no projects) |
| **Test Steps** | 1. Log in as a Manager who has created no projects. 2. Observe the charts. |
| **Expected Result** | Charts show "No data available" message instead of broken empty charts |
| **Actual Result** | Graceful empty state message displayed correctly |
| **Status** | ✅ Pass |

---

## Summary

| Module | Total Tests | Passed | Failed |
|--------|-------------|--------|--------|
| Authentication | 5 | 5 | 0 |
| Employee Management | 8 | 8 | 0 |
| Project Management | 8 | 8 | 0 |
| Task Management | 8 | 8 | 0 |
| Leave Management | 10 | 10 | 0 |
| Notification System | 6 | 6 | 0 |
| Dashboard and Analytics | 4 | 4 | 0 |
| **Total** | **49** | **49** | **0** |