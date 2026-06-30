import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import KanbanColumn from '../components/TaskColumn';
import { useAuth } from '../context/AuthContext';

function TaskManagement() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (err) {
      console.error('Failed to load projects for filter');
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedProject) params.projectId = selectedProject;

      const response = await api.get('/tasks', { params });
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  const todoTasks = tasks.filter((t) => t.status === 'To Do');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t) => t.status === 'Done');

  const handleTaskClick = (task) => {
    // Task Detail modal will be wired up tomorrow
    console.log('Clicked task:', task);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tasks</h1>

        <div className="flex items-center gap-3">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none"
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>{project.title}</option>
            ))}
          </select>

          {canManage && (
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
            >
              + Create New Task
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          <KanbanColumn title="To Do" tasks={todoTasks} onTaskClick={handleTaskClick} />
          <KanbanColumn title="In Progress" tasks={inProgressTasks} onTaskClick={handleTaskClick} />
          <KanbanColumn title="Done" tasks={doneTasks} onTaskClick={handleTaskClick} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default TaskManagement;