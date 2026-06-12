# Wireframe Notes

**Project Name:** Company Operations Management System  
**Author:** Vidushi Gupta  
**Last Updated:** June 2025  
**Purpose:** Describe the layout and components of each page in plain text before any visual design or coding begins.  

---

## 1. Login Page

**Layout:**

```
+----------------------------------------------+
|                                              |
|           [ App Logo / App Name ]            |
|                                              |
|         [ Email Address Input Field ]        |
|                                              |
|         [ Password Input Field  👁 ]         |
|                                              |
|              [ Login Button ]                |
|                                              |
|           Forgot Password? (link)            |
|                                              |
+----------------------------------------------+
```

**Components:**
- App logo and name at the top center
- Email address input field
- Password input field with show / hide toggle icon
- Login button (full width)
- Forgot password link below the button
- Error message area that appears below the fields on a failed login attempt

**Behaviour:**
- On successful login → redirect to Dashboard (page shown depends on user role)
- On failed login → show an inline error message, do not clear the input fields
- No registration link visible (accounts are created by the Admin only)

---

## 2. Dashboard

**Layout:**

```
+-------------------+------------------------------------------+
|                   |   TOP NAVBAR                             |
|   SIDEBAR NAV     |   [ App Name ]        [ User | Logout ]  |
|                   +------------+------------+----------------+
|   - Dashboard     |   CARD 1   |   CARD 2   |   CARD 3       |
|   - Employees     |            |            |                |
|   - Projects      +------------+------------+----------------+
|   - Tasks         |                                          |
|   - Leave         |   MAIN CONTENT AREA                      |
|   - Reports       |   Recent Activity Table                  |
|   (Admin only)    |                                          |
+-------------------+------------------------------------------+
```

**Summary Cards (content varies by role):**

| Summary Card        | Admin | Manager | Employee |
|---------------------|-------|---------|----------|
| Total Employees     | ✅    | ❌      | ❌       |
| Active Projects     | ✅    | ✅      | ✅       |
| Pending Leave Requests | ✅ | ✅      | ❌       |
| My Assigned Tasks   | ❌    | ❌      | ✅       |
| My Pending Leave    | ❌    | ❌      | ✅       |

**Components:**
- Top navbar with app name on the left and logged-in user name with logout button on the right
- Sidebar navigation on the left (Reports link visible to Admin only)
- Summary stat cards displayed in a row at the top of the main content area
- Recent activity table below the cards showing the latest system events

**Notes:**
- Sidebar should highlight the currently active page
- Summary cards should be clickable and navigate to the relevant module page

---

## 3. Employee Management

**Layout:**

```
+-------------------+----------------------------------------------+
|                   |  Employee Management                         |
|   SIDEBAR NAV     |  [ Search Bar ]              [ + Add New ]   |
|                   |  [ Filter by Department ▼ ] [ Filter by Role ▼ ] |
|                   +----------------------------------------------+
|                   |  TABLE:                                      |
|                   |  Name | Department | Role | Status | Actions |
|                   |  ---- | ---------- | ---- | ------ | ------- |
|                   |  .... | .......... | .... | ...... | 👁 ✏ 🗑 |
|                   |  .... | .......... | .... | ...... | 👁 ✏ 🗑 |
+-------------------+----------------------------------------------+
```

**Components:**
- Page title: Employee Management
- Search bar to filter employees by name
- Filter dropdowns for Department and Role
- Add New Employee button (visible to Admin only) → opens an Add Employee form
- Data table with columns: Name, Department, Role, Status (Active / Inactive), Actions
- Action icons per row: View Profile (👁), Edit (✏), Delete (🗑)

**Add Employee Form Fields:**
- Full Name
- Email Address
- Phone Number
- Department
- Role (Admin / Manager / Employee)
- Date of Joining
- Password (auto-generated or set manually)

**Notes:**
- Full page management access for Admin only
- Manager and Employee can view the list but cannot add, edit, or delete
- Clicking View Profile navigates to that employee's individual profile page

**Employee Profile Page contains:**
- Personal details (name, email, phone, department, role, joining date)
- List of projects the employee is assigned to
- Summary of tasks assigned (count by status)
- Leave summary (total taken, pending requests)

---

## 4. Project Management

**Layout:**

```
+-------------------+--------------------------------------------+
|                   |  Projects                                  |
|   SIDEBAR NAV     |  [ Search Bar ]   [ Filter by Status ▼ ]  |
|                   |  [ + Create New Project ] (Admin/Manager)  |
|                   +--------------------------------------------+
|                   |  PROJECT CARDS (Grid Layout):              |
|                   |                                            |
|                   |  +---------------+  +---------------+     |
|                   |  | Project Name  |  | Project Name  |     |
|                   |  | Status Badge  |  | Status Badge  |     |
|                   |  | Deadline      |  | Deadline      |     |
|                   |  | 👥 X Members  |  | 👥 X Members  |     |
|                   |  | [ View ]      |  | [ View ]      |     |
|                   |  +---------------+  +---------------+     |
+-------------------+--------------------------------------------+
```

**Components:**
- Search bar to search projects by name
- Filter by Status: All / Active / Completed / On Hold
- Create New Project button (visible to Admin and Manager only)
- Project cards displayed in a grid layout
- Each card shows: Project Name, Status badge, Deadline date, Number of assigned members, View button

**Status Badge Colours:**
- Active → Green
- On Hold → Yellow
- Completed → Blue
- Overdue → Red

**Project Detail Page Layout:**
```
+-------------------+--------------------------------------------+
|                   |  [ Project Name ]       [ Edit ] [ Delete ]|
|   SIDEBAR NAV     |  Status: Active   Deadline: DD/MM/YYYY     |
|                   |  Description: ...                          |
|                   +--------------------------------------------+
|                   |  Assigned Members        Tasks Overview    |
|                   |  - Employee Name 1       Total: X          |
|                   |  - Employee Name 2       To Do: X          |
|                   |  [ + Assign Member ]     In Progress: X    |
|                   |                          Done: X           |
|                   +--------------------------------------------+
|                   |  TASKS TABLE:                              |
|                   |  Task Name | Assignee | Priority | Status  |
+-------------------+--------------------------------------------+
```

**Notes:**
- Clicking View on a project card opens the Project Detail page
- All users can view projects they are assigned to
- Only Admin and Manager can create, edit, or delete projects

---

## 5. Task Management

**Layout:**

```
+-------------------+-------------------------------------------+
|                   |  Tasks   [ Filter by Project ▼ ]          |
|   SIDEBAR NAV     |  [ + Create New Task ] (Admin/Manager)    |
|                   +-----------+--------------+----------------+
|                   |  TO DO    |  IN PROGRESS  |    DONE       |
|                   |-----------|---------------|---------------|
|                   | +--------+| +----------+ | +----------+  |
|                   | |Task A  || | Task C   | | | Task E   |  |
|                   | |Assignee|| | Assignee | | | Assignee |  |
|                   | |🔴 High || | 🟡 Medium| | | 🟢 Low   |  |
|                   | +--------+| +----------+ | +----------+  |
|                   | +--------+|              |               |
|                   | |Task B  ||              |               |
|                   | +--------+|              |               |
+-------------------+-----------+--------------+----------------+
```

**Components:**
- Project dropdown filter at the top to view tasks by project
- Create New Task button (visible to Admin and Manager only)
- Three-column Kanban board: To Do / In Progress / Done
- Each task card shows: Task Name, Assignee Name, Priority badge

**Priority Badge Colours:**
- High → Red
- Medium → Yellow
- Low → Green

**Task Detail View (opens on clicking a task card):**
- Task name and description
- Assigned project
- Assigned employee
- Priority level
- Current status
- Created date and due date

**Notes:**
- Employees can only see tasks assigned to them
- Managers and Admin can see all tasks under their projects
- Status can be updated by the assigned employee or manager

---

## 6. Leave Management

**Employee View Layout:**

```
+-------------------+--------------------------------------------+
|                   |  My Leave                                  |
|   SIDEBAR NAV     |  [ + Apply for Leave ]                     |
|                   +--------------------------------------------+
|                   |  MY LEAVE HISTORY:                         |
|                   |  Type | From | To | Days | Status         |
|                   |  ---- | ---- | -- | ---- | ------         |
|                   |  .... | .... |... | .... | Pending ⏳     |
|                   |  .... | .... |... | .... | Approved ✅    |
|                   |  .... | .... |... | .... | Rejected ❌    |
+-------------------+--------------------------------------------+
```

**Manager / Admin View Layout:**

```
+-------------------+--------------------------------------------+
|                   |  Leave Requests                            |
|   SIDEBAR NAV     |  [ Pending ] [ Approved ] [ Rejected ]     |
|                   |  (tab filters)                             |
|                   +--------------------------------------------+
|                   |  PENDING APPROVALS TABLE:                  |
|                   |  Employee | Type | From | To | Action      |
|                   |  -------- | ---- | ---- | -- | ------      |
|                   |  ........ | .... | .... |... | ✅ ❌        |
+-------------------+--------------------------------------------+
```

**Apply for Leave Form Fields:**
- Leave Type (Sick Leave / Casual Leave / Annual Leave)
- From Date
- To Date
- Reason (text area)
- Submit button

**Components:**
- Apply for Leave button → opens the leave application form
- Leave history table for the employee (own records only)
- Tab filters for Manager/Admin view: Pending / Approved / Rejected
- Approve and Reject action buttons per row in the pending table
- Status indicators with colour coding: Pending (Orange), Approved (Green), Rejected (Red)

**Notes:**
- Employees cannot see other employees' leave records
- Managers can approve or reject leave for their team members
- Admin can approve or reject all leave requests across the organization