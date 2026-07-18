# User Manual

**Project Name:** Company Operations Management System  
**Author:** Vidushi Gupta  
**Last Updated:** July 2026  
**Purpose:** Provide a comprehensive guide for users to understand, navigate, and effectively use the Company Operations Management System.

---

## Introduction

The Company Operations Management System (COMS) is a web-based enterprise
application designed to centralize and streamline organizational operations.
This manual provides step-by-step guidance for using the system across all
three user roles: Admin, Manager, and Employee.

---

## Accessing the System

### Live Application
The system is accessible at the following URL:
```
https://company-ops-management.vercel.app/
```

### Supported Browsers
- Google Chrome (recommended)
- Microsoft Edge
- Mozilla Firefox

### System Requirements
- A stable internet connection
- A modern web browser with JavaScript enabled
- A screen resolution of 1280 x 720 or higher

---

## User Roles

The system has three user roles with different levels of access:

| Role | Description |
|------|-------------|
| **Admin** | Full system access — manages users, employees, projects, tasks, leaves and reports |
| **Manager** | Manages projects and tasks, approves or rejects leave requests |
| **Employee** | Views own data, applies for leave, updates own assigned task status |

---

## 1. Login

All users access the system through the Login page.

**Steps:**
1. Open the application URL in your browser
2. Enter your registered **Email Address**
3. Enter your **Password** (click the 👁 icon to show/hide)
4. Click the **Login** button

**After Login:**
- Admin users are redirected to the **Admin Dashboard**
- Manager users are redirected to the **Manager Dashboard**
- Employee users are redirected to the **Employee Dashboard**

**If Login Fails:**
- An error message will appear below the password field
- Check that your email and password are correct
- Contact your system Admin if you have forgotten your credentials

> **Note:** Account registration is not available from the login page.
> All accounts are created by the Admin through the Employee Management module.

---

## 2. Navigation

After logging in, the application displays:

- **Sidebar (left):** Navigation links to all modules
- **Navbar (top):** Application title, notification bell, and user menu
- **Main Content Area (center):** The active module's content

### Sidebar Links by Role

| Link | Admin | Manager | Employee |
|------|-------|---------|----------|
| Dashboard | ✅ | ✅ | ✅ |
| Employees | ✅ | ✅ | ❌ |
| Projects | ✅ | ✅ | ✅ |
| Tasks | ✅ | ✅ | ✅ |
| Leave | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ✅ |
| Reports | ✅ | ❌ | ❌ |

### Logging Out
Click your **name/avatar** in the top right of the navbar to open the user
menu, then click **Logout**.

---

## 3. Dashboard

The Dashboard is the first page shown after login. It displays a summary
of the system tailored to each user's role.

### Admin Dashboard
- **Summary Cards:** Total Employees, Active Projects, Pending Approvals,
  New Employees (last 30 days), Overdue Tasks, and Projects Near Deadline
- **Charts:**
  - Employees by Department (Bar Chart)
  - Projects by Status (Donut Chart)
  - Tasks by Status (Donut Chart)
  - Leave Requests by Status (Donut Chart)
- **Recent Leave Requests Table:** Latest 5 leave requests across all employees

### Manager Dashboard
- **Summary Cards:** My Projects, Team Members, Tasks Assigned Today,
  Projects Near Deadline
- **Charts:**
  - Tasks by Status (Donut Chart)
  - My Projects by Status (Bar Chart)
- **My Recent Projects List**

### Employee Dashboard
- **Summary Cards:** My Tasks, Active Projects, Leave Balance (days taken
  this year), Unread Notifications
- **Charts:**
  - My Tasks by Status (Donut Chart)
  - My Tasks by Priority (Donut Chart)
- **My Recent Tasks List**
- **My Projects List**

---

## 4. Employee Management

> **Access:** Admin has full access. Manager and Employee can view only.

### Viewing Employees
1. Click **Employees** in the sidebar
2. The employee list table shows Name, Department, Role, and Status
3. Use the **Search bar** to filter by name
4. Use the **Department** and **Status** dropdowns to narrow results
5. Click **Apply Filters** to apply the selected filters

### Adding a New Employee (Admin Only)
1. Click the **+ Add Employee** button (top right of the page)
2. Fill in all required fields:
   - Full Name
   - Email Address (used for login)
   - Phone Number
   - Department
   - Role (Admin / Manager / Employee)
   - Date of Joining
   - Password (initial login password)
3. Click **Save**
4. The new employee appears in the list immediately

> **Note:** Adding an employee automatically creates their login account.
> Share the email and password with the new employee so they can log in.

### Editing an Employee (Admin Only)
1. Click the **✏ Edit** icon on any employee row
2. Update the available fields (Name and Email cannot be changed in edit mode)
3. Click **Save**

### Deleting an Employee (Admin Only)
1. Click the **🗑 Delete** icon on any employee row
2. Confirm the deletion in the dialog that appears
3. Click **Delete**

> **Warning:** Deleting an employee also permanently deletes their login
> account. This action cannot be undone.

### Viewing an Employee Profile
1. Click the **👁 View** icon on any employee row
2. The profile page shows:
   - Personal and professional details
   - Assigned Projects
   - Recent Tasks with priority indicators
   - Leave History

---

## 5. Project Management

> **Access:** Admin and Manager can create, edit, and delete. All roles can view.

### Viewing Projects
1. Click **Projects** in the sidebar
2. Projects are displayed as cards in a grid layout
3. Each card shows the Project Name, Status badge, Deadline, and Member count
4. Use the **Search bar** to find a project by name
5. Use the **Status filter** to show: All / Active / On Hold / Completed / Overdue

### Status Badge Colors
| Status | Color |
|--------|-------|
| Active | 🟢 Green |
| On Hold | 🟡 Yellow |
| Completed | 🔵 Blue |
| Not Started | ⚪ Grey |
| Overdue | 🔴 Red |

> **Note:** Overdue status is calculated automatically when a project's
> deadline has passed and it has not been marked as Completed.

### Creating a New Project (Admin/Manager Only)
1. Click **+ Create New Project**
2. Fill in:
   - Project Title
   - Description
   - Status
   - Start Date
   - Deadline
3. Click **Create Project**

### Viewing Project Details
1. Click **View Details** on any project card
2. The detail page shows:
   - Project information and status
   - Assigned Members list
   - Tasks Overview (count by status)
   - Full Project Tasks table

### Assigning Members to a Project (Admin/Manager Only)
1. Open the Project Detail page
2. Click **+ Assign Member**
3. Select an employee from the dropdown
4. Click **Assign**

> **Note:** Employees already assigned to the project will not appear
> in the dropdown.

### Removing a Member (Admin/Manager Only)
1. Open the Project Detail page
2. Click **Remove** next to the member you want to remove

### Editing or Deleting a Project (Admin/Manager Only)
1. Open the Project Detail page
2. Click **Edit** to update project details, or **Delete** to remove it
3. Confirm deletion when prompted

---

## 6. Task Management

> **Access:** Admin and Manager can create, edit, and delete tasks.
> Employees can only update the status of tasks assigned to them.

### Viewing Tasks
1. Click **Tasks** in the sidebar
2. Tasks are displayed in a **Kanban board** with three columns:
   - **To Do** — tasks not yet started
   - **In Progress** — tasks currently being worked on
   - **Done** — completed tasks
3. Use the **Project dropdown** to filter tasks by a specific project

> **Note:** Employees see only tasks assigned to them. Admin and Manager
> see all tasks.

### Task Card Information
Each task card displays:
- Task title
- Assigned employee name
- Priority badge (🔴 High / 🟡 Medium / 🟢 Low)
- Due date

### Viewing Task Details
1. Click on any task card
2. The Task Detail modal shows all task information including description,
   project, assignee, priority, status, and dates

### Updating Task Status
1. Click on any task card to open the Task Detail modal
2. Change the **Status** dropdown to the desired value
3. Click **Update**

> **Note for Employees:** You can only update the status of tasks
> assigned to you. You cannot change other fields.

### Creating a New Task (Admin/Manager Only)
1. Click **+ Create New Task**
2. Fill in:
   - Task Title
   - Description
   - Project (select from dropdown)
   - Assign To (select an employee)
   - Priority
   - Status
   - Due Date
3. Click **Create Task**

> **Note:** Creating a task automatically sends a notification to the
> assigned employee.

### Editing or Deleting a Task (Admin/Manager Only)
1. Click on a task card to open the Task Detail modal
2. Click **Edit** to update task details
3. Click **Delete** to remove the task (confirm when prompted)

---

## 7. Leave Management

> **Access:** All roles can apply for leave. Admin and Manager can approve
> or reject requests.

### Employee View — Applying for Leave
1. Click **Leave** in the sidebar
2. Click **+ Apply for Leave**
3. Fill in:
   - Leave Type (Sick Leave / Casual Leave / Annual Leave)
   - From Date
   - To Date
   - Reason
4. Click **Submit**

> **Note:** You cannot submit a leave request if the dates overlap with
> an existing Pending or Approved request.

### Employee View — Leave History
Your personal leave history table shows:
- Leave Type
- From and To dates
- Number of days
- Status (Pending / Approved / Rejected)
- Date applied

### Cancelling a Leave Request (Employee)
1. Find the Pending leave request in your history table
2. Click **Cancel** in the Action column

> **Note:** You can only cancel Pending requests. Approved or Rejected
> requests cannot be cancelled.

### Manager/Admin View — Reviewing Leave Requests
1. Click **Leave** in the sidebar
2. Use the tab filters to view: **All / Pending / Approved / Rejected**
3. For Pending requests, click:
   - ✅ **Approve** — to approve the request
   - ❌ **Reject** — to reject the request
4. The Reviewed By column updates to show your name after you take action

> **Note:** Once approved or rejected, the employee automatically
> receives a notification about the decision.

---

## 8. Notification System

Notifications are automatically generated when:
- A task is assigned to you
- You are added to a project
- Your leave request is approved or rejected

### Notification Bell
- The 🔔 bell icon in the navbar shows your unread notification count
- Click the bell to open a dropdown with your 5 most recent notifications
- Click **Mark all as read** to clear the unread count
- Click **View all notifications →** to open the full notifications page

### Full Notifications Page
1. Click **Notifications** in the sidebar or click **View all notifications**
2. Use the tab filters: **All / Unread / Read**
3. Click **Mark read** on individual notifications
4. Click **Mark All as Read** to mark everything as read
5. Click **Delete** to permanently remove a notification

### Notification Types and Colors
| Type | Color |
|------|-------|
| Task Assigned | 🔵 Blue |
| Leave Approved | 🟢 Green |
| Leave Rejected | 🔴 Red |
| Project Assignment | 🟣 Purple |

---

## 9. Reports

> **Access:** Admin only

The Reports page is accessible from the Admin sidebar. This module is
planned for a future release and will provide detailed operational reports
and data exports for organizational analysis.

---

## 10. Common Questions

**Q: I forgot my password. What should I do?**
Contact your system Admin. They can delete your account and create a new
one with a new password.

**Q: Why can I not see some pages in the sidebar?**
The sidebar shows only the pages available to your role. Employees do not
see Employees or Reports. Managers do not see Reports.

**Q: My session ended and I was redirected to the login page. Why?**
Your login session expires after 7 days for security. Simply log in again
with your credentials.

**Q: Why is the app slow to respond on the first request?**
The backend server is hosted on Render's free tier, which sleeps after
15 minutes of inactivity. The first request after an idle period may take
30-60 seconds while the server wakes up. Subsequent requests will be fast.

**Q: Can I change my own email or password?**
Not currently through the UI. Contact your Admin to update your account
details.

**Q: Why does my Leave Balance show a high number?**
The Leave Balance card shows the total number of approved leave days taken
in the current calendar year. During testing and setup, multiple leave
requests may have been created, resulting in a higher number than expected.

---

## 11. Tips for Getting Started

**For Admins:**
1. Start by adding all employees through Employee Management
2. Create projects and assign employees to them
3. Create tasks under each project and assign them to team members
4. Monitor the Admin Dashboard for overdue tasks and pending approvals

**For Managers:**
1. Log in and check your Manager Dashboard for team overview
2. Create projects you are responsible for
3. Assign tasks to your team members
4. Review and action pending leave requests regularly

**For Employees:**
1. Log in and check your Employee Dashboard for your tasks and projects
2. Click on task cards to view details and update your task status
3. Apply for leave through the Leave module when needed
4. Check your notifications regularly for updates on tasks and approvals