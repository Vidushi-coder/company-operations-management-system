import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import DonutChart from '../components/DonutChart';
import { getDisplayStatus } from '../utils/projectHelpers';

function EmployeeDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/employee');
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <DashboardLayout><p className="text-gray-400">Loading dashboard...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p className="text-red-400">⚠ {error}</p></DashboardLayout>;

  const { stats: s, charts, myTasks, myProjects } = stats;

  const taskStatusLabels = ['To Do', 'In Progress', 'Done'];
  const taskStatusData = taskStatusLabels.map(
    (label) => charts.tasksByStatus.find((t) => t._id === label)?.count || 0
  );

  const taskPriorityLabels = ['High', 'Medium', 'Low'];
  const taskPriorityData = taskPriorityLabels.map(
    (label) => charts.tasksByPriority.find((t) => t._id === label)?.count || 0
  );

  const priorityColors = {
    High: 'bg-red-900 text-red-400',
    Medium: 'bg-yellow-900 text-yellow-400',
    Low: 'bg-green-900 text-green-400'
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-6">My Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">My Tasks</p>
          <p className="text-3xl font-bold text-white">{s.totalTasks}</p>
          <p className="text-blue-400 text-xs mt-1">✅ Total assigned</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-white">{s.activeProjects}</p>
          <p className="text-green-400 text-xs mt-1">📁 Assigned to me</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Leave Balance</p>
          <p className="text-3xl font-bold text-white">{s.totalDaysTaken}</p>
          <p className="text-yellow-400 text-xs mt-1">📅 Days taken this year</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Notifications</p>
          <p className="text-3xl font-bold text-white">{s.unreadNotifications}</p>
          <p className="text-purple-400 text-xs mt-1">🔔 Unread</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DonutChart
          title="My Tasks by Status"
          labels={taskStatusLabels}
          data={taskStatusData}
          colors={['#6b7280', '#facc15', '#22c55e']}
        />
        <DonutChart
          title="My Tasks by Priority"
          labels={taskPriorityLabels}
          data={taskPriorityData}
          colors={['#ef4444', '#facc15', '#22c55e']}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* My Recent Tasks */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">My Recent Tasks</h3>
          </div>
          {myTasks.length === 0 ? (
            <p className="px-5 py-6 text-gray-400 text-sm">No tasks assigned yet</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {myTasks.map((task) => (
                <div key={task._id} className="px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-white text-sm font-medium">{task.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Projects */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">My Projects</h3>
          </div>
          {myProjects.length === 0 ? (
            <p className="px-5 py-6 text-gray-400 text-sm">No projects assigned yet</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {myProjects.map((project) => {
                const { label, classes } = getDisplayStatus(project);
                return (
                  <div key={project._id} className="px-5 py-4 flex justify-between items-center">
                    <div>
                      <p className="text-white text-sm font-medium">{project.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${classes}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeDashboard;