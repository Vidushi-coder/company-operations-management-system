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

| Summary Card             | Admin | Manager | Employee |
|--------------------------|-------|---------|----------|
| Total Employees          | ✅    | ❌      | ❌       |
| Active Projects          | ✅    | ✅      | ✅       |
| Pending Leave Requests   | ✅    | ✅      | ❌       |
| My Assigned Tasks        | ❌    | ❌      | ✅       |
| My Pending Leave         | ❌    | ❌      | ✅       |
| Unread Notifications     | ✅    | ✅      | ✅       |

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

---

## 7. Notification Panel

**Layout:**

```
+-------------------+------------------------------------------+

|                   |  TOP NAVBAR                              |

|   SIDEBAR NAV     |  [ App Name ]    [ 🔔 3 ]  [ User | Logout ] |

|                   +------------------------------------------+

|                   |                                          |

|                   |   NOTIFICATIONS DROPDOWN (on bell click):|

|                   |   +------------------------------------+ |

|                   |   | 🔵 Task "Fix Login Bug" assigned   | |

|                   |   |    to you — 2 mins ago             | |

|                   |   +------------------------------------+ |

|                   |   | 🟢 Your leave request approved     | |

|                   |   |    by Manager — 1 hour ago         | |

|                   |   +------------------------------------+ |

|                   |   | 🔵 Added to Project "CRM App"      | |

|                   |   |    — Yesterday                     | |

|                   |   +------------------------------------+ |

|                   |   |        [ View All ]                | |

|                   |   +------------------------------------+ |

+-------------------+------------------------------------------+
```

**Components:**
- Bell icon in the top navbar with a badge showing unread notification count
- Dropdown panel appears when the bell icon is clicked
- Each notification shows: message, type indicator colour, and time ago
- Mark as read on click (notification becomes lighter/grey)
- View All link at the bottom navigates to a full notifications page

**Notification Type Colour Indicators:**
- Task Assigned → Blue
- Leave Approved → Green
- Leave Rejected → Red
- Project Assignment → Purple

**Full Notifications Page Layout:**

```
+-------------------+------------------------------------------+

|                   |  Notifications   [ Mark All as Read ]    |

|   SIDEBAR NAV     +------------------------------------------+

|                   |  [ All ] [ Unread ] [ Read ]             |

|                   |  (tab filters)                           |

|                   +------------------------------------------+

|                   |  TYPE  | MESSAGE            | TIME       |

|                   |  ----- | ------------------ | ---------- |

|                   |  🔵    | Task assigned...   | 2 mins ago |

|                   |  🟢    | Leave approved...  | 1 hr ago   |

|                   |  🟣    | Added to project.. | Yesterday  |

+-------------------+------------------------------------------+
```

**Notes:**
- Notifications are user specific, each user only sees their own
- Unread notifications are highlighted, read ones are greyed out
- Notification count badge on bell icon disappears when all are read

---

## 8. Employee Dashboard

**Layout:**

```
+-------------------+------------------------------------------+

|                   |  TOP NAVBAR                              |

|   SIDEBAR NAV     |  [ App Name ]  [ 🔔 2 ]  [ Employee ▼ ] |

|                   +----------+----------+----------+---------+

|   - Dashboard     |  CARD 1  |  CARD 2  |  CARD 3  | CARD 4  |

|   - Projects      |  Active  |  My Tasks|  Pending | Unread  |

|   - Tasks         |  Projects|  Today   |  Leave   | Notif.  |

|   - Leave         +----------+----------+----------+---------+

|                   |                      |                   |

|                   |  MY ASSIGNED TASKS   |  PROFILE SUMMARY  |

|                   |  Task A  🔴 High     |  Name: .....      |

|                   |  Task B  🟡 Medium   |  Dept: .....      |

|                   |  Task C  🟢 Low      |  Role: Employee   |

|                   |  [ View All Tasks ]  |  Status: Active   |

|                   |                      |  [ View Profile ] |

|                   +----------------------+-------------------+

|                   |                                          |

|                   |  MY PROJECTS                             |

|                   |  Project Alpha — 🟢 Active — Dec 2026   |

|                   |  Project Beta  — 🟡 On Hold — Jan 2027  |

|                   +------------------------------------------+

|                   |                                          |

|                   |  NOTIFICATIONS                           |

|                   |  🔵 Task assigned to you — 2 mins ago   |

|                   |  🟢 Leave request approved — 1 hr ago   |

|                   |  [ View All Notifications ]              |

+-------------------+------------------------------------------+
```

**Components:**
- Sidebar with only Employee relevant links — no Reports, no Employees
- Navbar with notification bell and user dropdown
- Four summary cards: Active Projects, My Tasks Today, Pending Leave, 
  Unread Notifications
- My Assigned Tasks section with priority badges and due dates
- Profile Summary section with basic details and View Profile link
- My Projects section showing assigned projects with status and deadline
- Notifications section showing latest notifications

**Notes:**
- All data shown is personal to the logged in employee only
- Employee cannot see Reports or Employee Management in the sidebar
- Sidebar has fewer links compared to Admin and Manager view