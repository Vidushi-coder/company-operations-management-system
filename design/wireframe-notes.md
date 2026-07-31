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

## 2. Dashboard (Initial Concept)

**Layout:**

```
+--------------------------+------------------------------------------+
|                          |   TOP NAVBAR                             |
|   SIDEBAR NAV            |   [ App Name ]        [ User | Logout ]  |
|                          +------------+------------+----------------+
|   - Dashboard            |   CARD 1   |   CARD 2   |   CARD 3       |
|   - Employees            |            |            |                |
|   - Projects             +------------+------------+----------------+
|   - Tasks                |                                          |
|   - Leave                |   MAIN CONTENT AREA                      |
|   - Notification         |   MAIN CONTENT AREA                      |
+--------------------------+------------------------------------------+
```

**Initial Summary Cards concept (content varies by role):**

| Summary Card             | Admin | Manager | Employee |
|--------------------------|-------|---------|----------|
| Total Employees          | ✅    | ❌     | ❌       |
| Active Projects          | ✅    | ✅     | ✅       |
| Pending Leave Requests   | ✅    | ✅     | ❌       |
| My Assigned Tasks        | ❌    | ❌     | ✅       |
| My Pending Leave         | ❌    | ❌     | ✅       |
| Unread Notifications     | ✅    | ✅     | ✅       |

> **Note:** These cards were refined during implementation to be more
> actionable. The final dashboard cards are: **Admin** — Overdue Tasks
> and Projects Near Deadline (risk indicators), in addition to the
> counts above. **Manager** — Team Members and Tasks Assigned Today,
> plus their own Projects Near Deadline. **Employee** — Leave Balance
> (total days taken this year) rather than a simple pending count. See
> `docs/system-overview.md` and the dashboard controller for the final
> per-role stat definitions.

**Components:**
- Top navbar with app name on the left and logged-in user name with logout button on the right
- Sidebar navigation on the left
- Summary stat cards displayed in a row at the top of the main content area
- Recent activity table below the cards showing the latest system events

**Notes:**
- Sidebar should highlight the currently active page

---

## 3. Employee Management

**Layout:**

```
+-------------------+----------------------------------------------+

|                   |  Employee Management                         |

|   SIDEBAR NAV     |  [ Search Bar ] [ Filter Department ▼ ]      |

|                   |  [ Filter by Status ▼ ] [ + Add New ]        |

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
- Filter dropdown for Department
- Filter dropdown for Status (Active / Inactive)
- Add New Employee button (visible to Admin only) → opens an Add Employee form
- Data table with columns: Name, Department, Role, Status (Active / Inactive), Actions
- Action icons per row: View Profile (👁), Edit (✏), Delete (🗑)
- Role column is populated from the linked User account, not stored directly on the Employee record

**Add Employee Form Fields:**
- Full Name
- Email Address
- Phone Number
- Department
- Role (**Manager / Employee only** — Admin is not a selectable option here; Admin accounts are created separately via direct registration and never receive an Employee profile)
- Date of Joining
- Password (set by Admin during creation)

**Notes:**
- Full page management access for Admin only (Add, Edit, Delete)
- Manager and Employee can view the list but cannot add, edit, or delete
- View Profile (👁) is available to all roles
- Clicking View Profile navigates to that employee's individual profile page
- Adding or deleting an employee also creates/removes their linked login (User) account

**Employee Profile Page contains:**
- Personal details (name, email, phone, department, designation, role, joining date, status)
- Assigned Projects — live data, fetched from the Project Management module
- Task Summary — live data, fetched from the Task Management module
- Leave Summary — live data, fetched from the Leave Management module

(All three sections are fetched in parallel via `Promise.all` once the relevant modules exist — they are no longer placeholders in the finished application.)

---

## 4. Project Management

**Layout:**

```
+-------------------+--------------------------------------------+
|                   |  Projects                                  |
|   SIDEBAR NAV     |  [ Search Bar ]   [ Filter by Status ▼ ]   |
|                   |  [ + Create New Project ] (Admin/Manager)  |
|                   +--------------------------------------------+
|                   |  PROJECT CARDS (Grid Layout):              |
|                   |                                            |
|                   |  +---------------+  +---------------+      |
|                   |  | Project Name  |  | Project Name  |      |
|                   |  | Status Badge  |  | Status Badge  |      |
|                   |  | Deadline      |  | Deadline      |      |
|                   |  | 👥 X Members  |  | 👥 X Members  |     |
|                   |  | [ View ]      |  | [ View ]      |      |
|                   |  +---------------+  +---------------+      |
+-------------------+--------------------------------------------+
```

**Components:**
- Search bar to search projects by name
- Filter by Status: All / Not Started / Active / Completed / On Hold
- Create New Project button (visible to Admin and Manager only)
- Project cards displayed in a grid layout
- Each card shows: Project Name, Status badge, Deadline date, Number of assigned members, View button

**Status Badge Colours:**
- Not Started → Grey
- Active → Green
- On Hold → Yellow
- Completed → Blue
- Overdue → Red (computed client-side, not a stored status)

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
|                   +--------------------------------------------+
|                   |  AI COMPLETION PREDICTOR CARD               |
|                   |  (see Section 9)                            |
+-------------------+--------------------------------------------+
```

**Notes:**
- Clicking View on a project card opens the Project Detail page
- All users can view projects they are assigned to
- Only Admin and Manager can create, edit, or delete projects
- Admin and Manager also see the AI Completion Predictor card on this page (see Section 9); it is not visible to Employees

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
|                   | +--------+| +----------+ | +----------+   |
|                   | |Task A  || | Task C   | | | Task E   |   |
|                   | |Assignee|| | Assignee | | | Assignee |   |
|                   | |🔴 High || | 🟡 Medium|| | 🟢 Low   |   |
|                   | +--------+| +----------+ | +----------+   |
|                   | +--------+|              |                |
|                   | |Task B  ||              |                |
|                   | +--------+|              |                |
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
- Employees can only see tasks assigned to them, and can only update the status field on their own tasks
- Managers and Admin can see all tasks and can edit any field
- Kanban columns are filtered client-side from a single fetched task list — there is no separate API call per column

---

## 6. Leave Management

**Employee View Layout:**

```
+-------------------+--------------------------------------------+
|                   |  My Leave                                  |
|   SIDEBAR NAV     |  [ + Apply for Leave ]                     |
|                   +--------------------------------------------+
|                   |  MY LEAVE HISTORY:                         |
|                   |  Type | From | To | Days | Status          |
|                   |  ---- | ---- | -- | ---- | ------          |
|                   |  .... | .... |... | .... | Pending ⏳      |
|                   |  .... | .... |... | .... | Approved ✅     |
|                   |  .... | .... |... | .... | Rejected ❌     |
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
|                   |  ........ | .... | .... |... | ✅ ❌      |
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
- The system has no formal manager-to-employee reporting hierarchy, so a Manager can approve or reject leave for any Employee (not just a specific "team") — a Manager is blocked only from approving their own leave or another Manager's leave
- Admin can approve or reject any leave request, provided the applicant has an Employee profile
- Overlapping leave requests (same employee, conflicting Pending/Approved dates) are blocked at submission

---

## 7. Notification Panel

**Layout:**

```
+-------------------+------------------------------------------+

|                   |  TOP NAVBAR                              |

|   SIDEBAR NAV     | [ App Name ]    [ 🔔 3 ]  [ User | Logout ] |

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
- Bell icon in the top navbar with a badge showing unread notification count (polls every 30 seconds)
- Dropdown panel appears when the bell icon is clicked
- Each notification shows: message, type indicator colour, and time ago
- Mark as read on click (notification becomes lighter/grey)
- View All link at the bottom navigates to a full notifications page

**Notification Type Colour Indicators:**
- Task Assigned → Blue
- Leave Approved → Green
- Leave Rejected → Red
- Project Assignment → Purple
- Leave Requested → Orange (sent to Admins, and to Managers when the applicant is an Employee)

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

|   - Projects      |  Active  |  My Tasks|  Leave   | Unread  |

|   - Tasks         |  Projects|  Today   |  Balance | Notif.  |

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
- Sidebar with only Employee relevant links — no Employees
- Navbar with notification bell and user dropdown
- Four summary cards: Active Projects, My Tasks Today, **Leave Balance (days taken this year)**, Unread Notifications
- My Assigned Tasks section with priority badges and due dates
- Profile Summary section with basic details and View Profile link
- My Projects section showing assigned projects with status and deadline
- Notifications section showing latest notifications

**Notes:**
- All data shown is personal to the logged in employee only
- Employee cannot see Employee Management in the sidebar
- Sidebar has fewer links compared to Admin and Manager view
- "Leave Balance" shows total days taken this calendar year, not days remaining — there is no configured annual allowance in the current system

---

## 9. AI Project Completion Predictor Card

**Location:** Bottom of the Project Detail page (see Section 4), visible to Admin and Manager only.

**Layout — State 4 (ready for prediction):**

```
+--------------------------------------------------+
|  AI Project Completion Predictor                  |
+--------------------------------------------------+
|  Team Size: X     Tasks: X     Completion: X%    |
|                                                    |
|            [ Generate Estimate ]                  |
+--------------------------------------------------+
```

**Layout — after a prediction is generated:**

```
+--------------------------------------------------+
|  AI Project Completion Predictor                  |
+--------------------------------------------------+
|  Predicted Duration:  XX days                     |
|  Confidence:          XX%                         |
|  Suggested Deadline:  DD/MM/YYYY                   |
|                                                    |
|  🟡 Suggested deadline differs from current        |
|     deadline (or 🟢 Deadlines already match)       |
|                                                    |
|        [ Regenerate ]   [ Apply Deadline ]         |
+--------------------------------------------------+
```

(Apply Deadline is hidden automatically when the suggested and current deadlines already match.)

**Components:**
- Metrics summary (team size, task count, completion percentage)
- Generate Estimate button
- Result display: predicted days, confidence percentage, suggested deadline
- Green/yellow comparison message against the current project deadline
- Regenerate button (re-runs the prediction with current metrics)
- Apply Deadline button (updates the project's deadline, hidden if no change is needed)

**Other three states (informational only, no button):**
- No members, no tasks → "Assign members and create tasks to generate a prediction"
- Members but no tasks → "Create at least one task to generate a prediction"
- Tasks but no members → "Assign at least one team member to generate a prediction"

**Notes:**
- Not visible to Employees, enforced both in the UI and at the backend route
- First request after Render idle time may take 30-60 seconds (cold start) — consider a loading state that accounts for this                                                                                                                                                                                                                                                                                                                                       