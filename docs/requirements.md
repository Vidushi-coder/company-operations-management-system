# Requirements Specification

## Project Title

Company Operations Management System

---

## Introduction

The Company Operations Management System is intended to provide a centralized platform for managing organizational activities including employee records, projects, tasks, leave requests, and operational reporting.

The system will help streamline workflows and improve management efficiency across different departments.

---

## Stakeholders

### Administrator

Responsible for:

* Managing employees
* Creating projects
* Assigning tasks
* Reviewing leave requests
* Monitoring system activities

### Employee

Responsible for:

* Viewing assigned tasks
* Updating task status
* Applying for leave
* Viewing personal information

### Manager

Responsible for:

* Creating and managing projects
* Creating and assigning tasks
* Approving or rejecting employee leave requests
* Monitoring team progress

---

## Functional Requirements

### Authentication Module

* User registration
* User login
* Secure authentication using JWT
* Role-based authorization

### Employee Management Module

* Add employee
* Edit employee
* Delete employee
* Search employee
* View employee details

### Project Management Module

* Create project
* Edit project
* Delete project
* Assign employees to projects
* Update project status

### Task Management Module

* Create task
* Assign task
* Set deadlines
* Set priorities
* Update task status

### Leave Management Module

* Submit leave request
* Approve leave request
* Reject leave request
* View leave history

### Dashboard Module

* Display employee statistics
* Display project statistics
* Display task summaries
* Display leave summaries

### Notification System Module

* Automatic notifications on task assignment
* Automatic notifications on project member assignment
* Automatic notifications on leave approval or rejection
* Automatic notifications to Admin and Manager on leave submission
* Mark notification as read
* Mark all notifications as read
* Delete notification

### AI Project Completion Predictor Module

* Generate estimated completion time based on project metrics
* Display confidence percentage per prediction
* Suggest deadline date based on prediction
* Apply AI-suggested deadline directly to project

---

## Non-Functional Requirements

### Performance

* Fast response time
* Efficient database operations

### Security

* Password protection
* JWT-based authentication
* Protected routes

### Usability

* User-friendly interface
* Responsive design

### Maintainability

* Modular code structure
* Reusable components
* Clear documentation

---

## Expected Deliverables

* Requirement Analysis Document
* Software Requirements Specification (SRS)
* ER Diagram
* Use Case Diagram
* Database Schema
* Low-Fidelity Wireframes
* UI Design System
* Source Code (Frontend and Backend)
* Test Cases Document
* User Manual
* Deployed Application

---

## Future Enhancements

* Clickable dashboard summary cards navigating to relevant modules
* Data export and reporting module
* Real-time WebSocket notifications instead of polling
* Training the ML model on real historical project data

---

## Current Phase

Completed — Deployed to Production