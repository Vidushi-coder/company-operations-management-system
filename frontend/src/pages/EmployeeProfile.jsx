import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { getDisplayStatus } from '../utils/projectHelpers';
import { getLeaveStatusBadge } from '../utils/leaveHelpers';

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [empRes, taskRes, leaveRes] = await Promise.all([
          api.get(`/employees/${id}`),
          api.get(`/tasks/employee/${id}`),
          api.get(`/leave/employee/${id}`)
        ]);
        setEmployee(empRes.data.employee);
        setTasks(taskRes.data.tasks);
        setLeaves(leaveRes.data.leaves);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employee profile');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) {
    return <DashboardLayout><p className="text-gray-400">Loading...</p></DashboardLayout>;
  }

  if (error || !employee) {
    return <DashboardLayout><p className="text-red-400">⚠ {error || 'Employee not found'}</p></DashboardLayout>;
  }

  const todoCount = tasks.filter((t) => t.status === 'To Do').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const doneCount = tasks.filter((t) => t.status === 'Done').length;

  const pendingLeaves = leaves.filter((l) => l.status === 'Pending').length;
  const approvedLeaves = leaves.filter((l) => l.status === 'Approved').length;

  const assignedProjects = [...new Map(
    tasks
      .filter((t) => t.projectId)
      .map((t) => [t.projectId._id?.toString() || t.projectId.toString(), t.projectId])
  ).values()];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Employee Profile</h1>
        <button
          onClick={() => navigate('/employees')}
          className="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Personal Details */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6 flex gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {employee.name?.charAt(0).toUpperCase()}
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div>
            <p className="text-xs text-gray-500 uppercase">Name</p>
            <p className="text-white">{employee.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Email</p>
            <p className="text-white">{employee.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Phone</p>
            <p className="text-white">{employee.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Department</p>
            <p className="text-white">{employee.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Designation</p>
            <p className="text-white">{employee.designation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Role</p>
            <p className="text-white">{employee.userId?.role}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Date of Joining</p>
            <p className="text-white">{new Date(employee.dateOfJoining).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Status</p>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              employee.status === 'Active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
            }`}>
              {employee.status}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{tasks.length}</p>
          <p className="text-gray-400 text-sm mt-1">Total Tasks</p>
          <div className="flex justify-center gap-3 mt-2 text-xs">
            <span className="text-gray-500">To Do: {todoCount}</span>
            <span className="text-yellow-400">In Progress: {inProgressCount}</span>
            <span className="text-green-400">Done: {doneCount}</span>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{assignedProjects.length}</p>
          <p className="text-gray-400 text-sm mt-1">Assigned Projects</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-white">{leaves.length}</p>
          <p className="text-gray-400 text-sm mt-1">Total Leave Requests</p>
          <div className="flex justify-center gap-3 mt-2 text-xs">
            <span className="text-yellow-400">Pending: {pendingLeaves}</span>
            <span className="text-green-400">Approved: {approvedLeaves}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Assigned Projects */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Assigned Projects</h3>
          </div>
          {assignedProjects.length === 0 ? (
            <p className="px-5 py-6 text-gray-400 text-sm">No projects assigned</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {assignedProjects.map((project) => {
                const { label, classes } = getDisplayStatus(project);
                return (
                  <div key={project._id || project} className="px-5 py-3 flex justify-between items-center">
                    <p className="text-sm text-gray-200">{project.title || 'Project'}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${classes}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Task Summary */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Recent Tasks</h3>
          </div>
          {tasks.length === 0 ? (
            <p className="px-5 py-6 text-gray-400 text-sm">No tasks assigned</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {tasks.slice(0, 5).map((task) => (
                <div key={task._id} className="px-5 py-3">
                  <p className="text-sm text-gray-200">{task.title}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      task.priority === 'High' ? 'bg-red-900 text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-900 text-yellow-400' :
                      'bg-green-900 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leave Summary */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Leave History</h3>
          </div>
          {leaves.length === 0 ? (
            <p className="px-5 py-6 text-gray-400 text-sm">No leave requests</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {leaves.slice(0, 5).map((leave) => (
                <div key={leave._id} className="px-5 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-200">{leave.leaveType}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(leave.fromDate).toLocaleDateString()} →{' '}
                      {new Date(leave.toDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getLeaveStatusBadge(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeProfile;