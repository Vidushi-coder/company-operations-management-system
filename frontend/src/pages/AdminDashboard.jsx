import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import DonutChart from '../components/DonutChart';
import BarChart from '../components/BarChart';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/admin');
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

  const { stats: s, charts, recentLeaves } = stats;

  const projectLabels = ['Not Started', 'Active', 'On Hold', 'Completed'];
  const projectData = projectLabels.map(
    (label) => charts.projectsByStatus.find((p) => p._id === label)?.count || 0
  );

  const taskLabels = ['To Do', 'In Progress', 'Done'];
  const taskData = taskLabels.map(
    (label) => charts.tasksByStatus.find((t) => t._id === label)?.count || 0
  );

  const deptLabels = charts.employeesByDepartment.map((d) => d._id);
  const deptData = charts.employeesByDepartment.map((d) => d.count);

  const leaveLabels = ['Pending', 'Approved', 'Rejected'];
  const leaveData = leaveLabels.map(
    (label) => charts.leavesByStatus.find((l) => l._id === label)?.count || 0
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

      {/* Summary Cards Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Total Employees</p>
          <p className="text-3xl font-bold text-white">{s.totalEmployees}</p>
          <p className="text-blue-400 text-xs mt-1">👥 All staff</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-white">{s.activeProjects}</p>
          <p className="text-green-400 text-xs mt-1">📁 Currently running</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-white">{s.pendingApprovals}</p>
          <p className="text-yellow-400 text-xs mt-1">📅 Leave requests awaiting</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">New Employees</p>
          <p className="text-3xl font-bold text-white">{s.newEmployees}</p>
          <p className="text-purple-400 text-xs mt-1">🆕 Joined last 30 days</p>
        </div>
      </div>

      {/* Summary Cards Row 2 — Risk KPIs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 border border-red-900 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Overdue Tasks</p>
          <p className="text-3xl font-bold text-red-400">{s.overdueTasks}</p>
          <p className="text-red-500 text-xs mt-1">⚠ Tasks past due date</p>
        </div>
        <div className="bg-gray-800 border border-yellow-900 rounded-lg p-5">
          <p className="text-gray-400 text-sm mb-1">Projects Near Deadline</p>
          <p className="text-3xl font-bold text-yellow-400">{s.projectsNearDeadline}</p>
          <p className="text-yellow-500 text-xs mt-1">⏰ Deadline within 7 days</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <BarChart
          title="Employees by Department"
          labels={deptLabels}
          data={deptData}
          color="#3b82f6"
        />
        <DonutChart
          title="Projects by Status"
          labels={projectLabels}
          data={projectData}
          colors={['#6b7280', '#22c55e', '#facc15', '#3b82f6']}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DonutChart
          title="Tasks by Status"
          labels={taskLabels}
          data={taskData}
          colors={['#6b7280', '#facc15', '#22c55e']}
        />
        <DonutChart
          title="Leave Requests by Status"
          labels={leaveLabels}
          data={leaveData}
          colors={['#facc15', '#22c55e', '#ef4444']}
        />
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Recent Leave Requests</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Employee</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">From</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentLeaves.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-400">No leave requests yet</td>
              </tr>
            ) : (
              recentLeaves.map((leave) => (
                <tr key={leave._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-200">{leave.employeeId?.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-200">{leave.leaveType}</td>
                  <td className="px-4 py-3 text-sm text-gray-200">{new Date(leave.fromDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${leave.status === 'Approved' ? 'bg-green-900 text-green-400' :
                        leave.status === 'Rejected' ? 'bg-red-900 text-red-400' :
                          'bg-yellow-900 text-yellow-400'
                      }`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;