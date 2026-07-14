import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import DonutChart from '../components/DonutChart';
import BarChart from '../components/BarChart';
import { getDisplayStatus } from '../utils/projectHelpers';

function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/manager');
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

  const { stats: s, charts, recentProjects } = stats;

  const taskLabels = ['To Do', 'In Progress', 'Done'];
  const taskData = taskLabels.map(
    (label) => charts.tasksByStatus.find((t) => t._id === label)?.count || 0
  );

  const projectLabels = ['Not Started', 'Active', 'On Hold', 'Completed'];
  const projectData = projectLabels.map(
    (label) => charts.projectsByStatus.find((p) => p._id === label)?.count || 0
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Manager Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">My Projects</p>
          <p className="text-3xl font-bold text-white">{s.managedProjects}</p>
          <p className="text-blue-400 text-xs mt-1">📁 Created by me</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Team Members</p>
          <p className="text-3xl font-bold text-white">{s.uniqueTeamMembers}</p>
          <p className="text-green-400 text-xs mt-1">👥 Across all projects</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Tasks Assigned Today</p>
          <p className="text-3xl font-bold text-white">{s.tasksAssignedToday}</p>
          <p className="text-purple-400 text-xs mt-1">✅ Created today</p>
        </div>
        <div className="bg-gray-800 border border-yellow-900 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Projects Near Deadline</p>
          <p className="text-3xl font-bold text-yellow-400">{s.projectsNearDeadline}</p>
          <p className="text-yellow-500 text-xs mt-1">⏰ Due within 7 days</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DonutChart
          title="Tasks by Status"
          labels={taskLabels}
          data={taskData}
          colors={['#6b7280', '#facc15', '#22c55e']}
        />
        <BarChart
          title="My Projects by Status"
          labels={projectLabels}
          data={projectData}
          color="#a855f7"
        />
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">My Recent Projects</h3>
        </div>
        {recentProjects.length === 0 ? (
          <p className="px-5 py-6 text-gray-400 text-sm">No projects created yet</p>
        ) : (
          <div className="divide-y divide-gray-700">
            {recentProjects.map((project) => {
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
    </DashboardLayout>
  );
}

export default ManagerDashboard;