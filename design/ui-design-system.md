# UI Design System

**Project Name:** Company Operations Management System  
**Author:** Vidushi Gupta  
**Last Updated:** June 2026  
**Status:** UI Design Phase  
**Purpose:** Define the visual rules, components, and design standards that ensure consistency across the entire application.  

---

## Overview

This document defines the design language for the Company Operations Management System. Every colour, font, button, and component used across the application is defined here. Developers must refer to this document when building any frontend component to ensure visual consistency.

The application is built with **React** and **Tailwind CSS**. All colour and spacing values reference Tailwind utility classes.

---

## 1. Color Palette

### Brand Colors

| Color Name | Tailwind Class | Hex Code | Used For |
|------------|---------------|----------|----------|
| Primary | `bg-blue-600` | #2563EB | Main buttons, active sidebar links, primary actions |
| Primary Hover | `bg-blue-700` | #1D4ED8 | Hover state of primary buttons and links |
| Secondary | `bg-slate-600` | #475569 | Secondary buttons, less important actions |
| Secondary Hover | `bg-slate-700` | #334155 | Hover state of secondary buttons |

### Status Colors

| Color Name | Tailwind Class | Hex Code | Used For |
|------------|---------------|----------|----------|
| Success | `bg-green-500` | #22C55E | Approved status, completed badges, success messages |
| Warning | `bg-yellow-400` | #FACC15 | Pending status, on hold badges, warning messages |
| Danger | `bg-red-500` | #EF4444 | Rejected status, delete buttons, error messages |
| Info | `bg-blue-400` | #60A5FA | Task assigned notifications, info badges |
| Purple | `bg-purple-500` | #A855F7 | Project assignment notifications |

### Neutral Colors

| Color Name | Tailwind Class | Hex Code | Used For |
|------------|---------------|----------|----------|
| Background | `bg-gray-950` | #030712 | Main page background |
| Sidebar Background | `bg-gray-900` | #111827 | Sidebar and navbar background |
| Card Background | `bg-gray-800` | #1F2937 | Dashboard cards, table rows, modals |
| Border | `border-gray-700` | #374151 | Table borders, card borders, input borders |
| Text Primary | `text-white` | #FFFFFF | Headings, main content text |
| Text Secondary | `text-gray-400` | #9CA3AF | Subtext, placeholder text, labels |
| Text Muted | `text-gray-500` | #6B7280 | Timestamps, disabled text |

---

## 2. Typography

### Font Family

```
Primary Font: Inter (imported from Google Fonts)
Fallback:     system-ui, sans-serif
```

Add this to your main CSS file:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Heading Sizes

| Element | Tailwind Class | Size | Weight | Used For |
|---------|---------------|------|--------|----------|
| H1 | `text-3xl font-bold` | 30px | Bold | Page titles |
| H2 | `text-2xl font-semibold` | 24px | Semibold | Section headings |
| H3 | `text-xl font-semibold` | 20px | Semibold | Card titles, modal titles |
| H4 | `text-lg font-medium` | 18px | Medium | Sub section headings |

### Body Text

| Element | Tailwind Class | Size | Weight | Used For |
|---------|---------------|------|--------|----------|
| Body Large | `text-base font-normal` | 16px | Normal | Main body content |
| Body Small | `text-sm font-normal` | 14px | Normal | Table content, descriptions |
| Label | `text-sm font-medium` | 14px | Medium | Form labels, column headers |
| Caption | `text-xs font-normal` | 12px | Normal | Timestamps, helper text |

---

## 3. Buttons

### Primary Button
Used for main actions: Login, Save, Submit, Create, Approve

```
Background:   bg-blue-600
Hover:        bg-blue-700
Text:         text-white font-medium
Padding:      px-4 py-2
Border Radius: rounded-md
```

Example label uses: Login, Save Changes, Create Project, Add Employee, Submit

---

### Secondary Button
Used for less important actions: Cancel, Back, Close

```
Background:   bg-slate-600
Hover:        bg-slate-700
Text:         text-white font-medium
Padding:      px-4 py-2
Border Radius: rounded-md
```

Example label uses: Cancel, Go Back, Close, Reset

---

### Danger Button
Used for destructive actions: Delete, Reject

```
Background:   bg-red-500
Hover:        bg-red-600
Text:         text-white font-medium
Padding:      px-4 py-2
Border Radius: rounded-md
```

Example label uses: Delete Employee, Reject Leave, Remove Member

---

### Outline Button
Used for secondary actions that need less visual weight: Edit, View, Export

```
Background:   bg-transparent
Border:       border border-gray-600
Hover:        bg-gray-700
Text:         text-gray-300 font-medium
Padding:      px-4 py-2
Border Radius: rounded-md
```

Example label uses: Edit, View Profile, View Details, Export

---

### Icon Buttons (Action Icons in Tables)
Used in the Actions column of tables

```
View Profile  👁  →  text-blue-400  hover:text-blue-300
Edit          ✏  →  text-yellow-400 hover:text-yellow-300
Delete        🗑  →  text-red-400   hover:text-red-300
Approve       ✅  →  text-green-400 hover:text-green-300
Reject        ❌  →  text-red-400   hover:text-red-300
```

---

## 4. Forms

### Input Fields

```
Background:    bg-gray-700
Border:        border border-gray-600
Focus Border:  focus:border-blue-500
Text:          text-white
Placeholder:   placeholder-gray-400
Padding:       px-3 py-2
Border Radius: rounded-md
Width:         w-full
```

### Dropdowns / Select

```
Same styling as Input Fields
Arrow indicator on the right side
Options background: bg-gray-800
Options hover:      bg-gray-700
```

### Text Areas

```
Same styling as Input Fields
Minimum height: min-h-24
Resize: resize-none or resize-y
```

### Form Labels

```
Text:        text-sm font-medium text-gray-300
Margin:      mb-1 (below label, above input)
```

### Validation Messages

```
Error Message:
  Text:       text-sm text-red-400
  Icon:       ⚠ shown before the message
  Position:   below the input field
  Trigger:    on form submit or on blur

Success Message:
  Text:       text-sm text-green-400
  Icon:       ✓ shown before the message
```

### Form Layout Rule
All forms inside modals follow this structure:
```
[ Label     ]
[ Input     ]
[ Error Msg ]  ← only visible on error
              (space between each field: mb-4)
```

---

## 5. Dashboard Components

### Statistic Cards

```
Background:    bg-gray-800
Border:        border border-gray-700
Border Radius: rounded-lg
Padding:       p-6
Layout:        Icon on left, Number large, Label below number

Number Text:   text-3xl font-bold text-white
Label Text:    text-sm text-gray-400
Icon:          text-blue-400 (or relevant colour per card)
Hover:         cursor-pointer, subtle border colour change
```

Card examples:
```
+----------------------+
|  👥  Total Employees |
|      24              |
|  All active staff    |
+----------------------+

+----------------------+
|  📁  Active Projects |
|      8               |
|  Currently running   |
+----------------------+
```

---

### Notification Cards (in dropdown)

```
Background:    bg-gray-800
Border Bottom: border-b border-gray-700
Padding:       px-4 py-3
Layout:        Colour dot on left, message text, time on right

Unread:        bg-gray-800, left border accent: border-l-2 border-blue-500
Read:          bg-gray-900, text-gray-500

Colour Dots:
  Task Assigned     → bg-blue-400
  Leave Approved    → bg-green-400
  Leave Rejected    → bg-red-400
  Project Assigned  → bg-purple-400
```

---

### Tables

```
Table Background:   bg-gray-800
Header Row:         bg-gray-900
Header Text:        text-xs font-semibold text-gray-400 uppercase
Body Row:           bg-gray-800
Row Hover:          bg-gray-750 (hover:bg-gray-700)
Row Border:         border-b border-gray-700
Cell Text:          text-sm text-gray-200
Cell Padding:       px-4 py-3
```

---

### Status Badges (used in tables and cards)

```
Base style: text-xs font-semibold px-2 py-1 rounded-full

Active / Approved / Completed:
  bg-green-900 text-green-400

Pending / On Hold / In Progress:
  bg-yellow-900 text-yellow-400

Inactive / Rejected / Overdue:
  bg-red-900 text-red-400

To Do / Not Started:
  bg-gray-700 text-gray-300
```

---

## 6. Navigation Components

### Sidebar

```
Width:          w-64 (256px)
Background:     bg-gray-900
Border Right:   border-r border-gray-700
Height:         h-screen (full viewport height)
Position:       fixed on the left

App Logo/Name:
  Padding:      px-6 py-4
  Text:         text-white text-xl font-bold
  Border Bottom: border-b border-gray-700

Navigation Links:
  Padding:      px-4 py-2 mx-2 rounded-md
  Text:         text-sm font-medium text-gray-400
  Icon + Label layout

Active Link:
  Background:   bg-blue-600
  Text:         text-white

Hover Link:
  Background:   bg-gray-800
  Text:         text-white
```

---

### Navbar (Top Bar)

```
Height:         h-16
Background:     bg-gray-900
Border Bottom:  border-b border-gray-700
Padding:        px-6
Layout:         App name left | Bell icon + User dropdown right

App Name:
  text-white font-semibold text-lg

Notification Bell:
  Icon:         🔔 text-gray-400 hover:text-white
  Badge:        bg-red-500 text-white text-xs rounded-full
                positioned top-right of the bell icon

User Dropdown:
  Shows: User name + role
  Arrow: ▼ chevron icon
  Dropdown options: View Profile, Logout
```

---

### Breadcrumb

```
Text:           text-sm text-gray-400
Separator:      / or > in text-gray-600
Active Page:    text-white font-medium
Position:       below navbar, above page title
Example:        Dashboard / Projects / Project Alpha
```

---

## 7. Reusable Cards

### Employee Card

```
Background:    bg-gray-800
Border:        border border-gray-700
Border Radius: rounded-lg
Padding:       p-4

Shows:
  - Avatar / initials circle (bg-blue-600 text-white)
  - Employee Name (text-white font-semibold)
  - Department (text-gray-400 text-sm)
  - Role Badge (rounded-full badge)
  - Status indicator dot (green = Active, red = Inactive)
```

---

### Project Card

```
Background:    bg-gray-800
Border:        border border-gray-700
Border Radius: rounded-lg
Padding:       p-5

Shows:
  - Project Name (text-white font-semibold text-lg)
  - Status Badge (colour coded)
  - Deadline (text-gray-400 text-sm with 📅 icon)
  - Member Count (text-gray-400 text-sm with 👥 icon)
  - View Details Button (outline button at bottom)
```

---

### Task Card (Kanban)

```
Background:    bg-gray-800
Border:        border border-gray-700
Border Left:   border-l-4 (colour based on priority)
  High:        border-l-red-500
  Medium:      border-l-yellow-400
  Low:         border-l-green-500
Border Radius: rounded-md
Padding:       p-3
Margin Bottom: mb-3

Shows:
  - Task Name (text-white text-sm font-medium)
  - Assignee Name (text-gray-400 text-xs with 👤 icon)
  - Priority Badge (colour coded)
  - Due Date (text-gray-400 text-xs with 📅 icon)
```

---

### Leave Request Card

```
Background:    bg-gray-800
Border:        border border-gray-700
Border Radius: rounded-lg
Padding:       p-4

Shows:
  - Employee Name (text-white font-semibold)
  - Leave Type (text-gray-400 text-sm)
  - Date Range: From → To (text-gray-300 text-sm)
  - Number of Days (text-gray-400 text-sm)
  - Status Badge (colour coded)
  - Approve / Reject buttons (for Manager and Admin view)
```

---

### Notification Card

```
Background:    bg-gray-800 (unread) / bg-gray-900 (read)
Border Bottom: border-b border-gray-700
Left Accent:   border-l-4 border-blue-500 (unread only)
Padding:       px-4 py-3

Shows:
  - Colour dot indicator (based on notification type)
  - Message text (text-white text-sm if unread, text-gray-400 if read)
  - Time ago (text-gray-500 text-xs)
  - Unread dot on right (small blue circle, hidden when read)
```

---

## 8. Spacing and Layout Rules

```
Page Padding:       p-6 (24px all sides)
Section Spacing:    mb-6 between major sections
Card Gap:           gap-4 in grid layouts
Table Cell Padding: px-4 py-3
Modal Width:        max-w-md (medium) or max-w-lg (large)
Modal Padding:      p-6
```

---

## 9. Responsive Breakpoints

Since this is primarily a desktop application:

```
Default (Mobile):   hidden sidebar, hamburger menu
md (768px):         partial sidebar
lg (1024px):        full sidebar visible, main layout active
xl (1280px):        optimal view
```

---

## 10. Dark Theme Rule

The entire application uses a **dark theme** throughout. There is no light mode. All components defined in this document assume a dark background. This is consistent with the background colours defined in the Color Palette section.