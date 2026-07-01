import { useState, useEffect } from 'react';
import api from '../api/axios';

function TaskFormModal({ isOpen, mode = 'add', task, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    projectId: '',
    assignedTo: '',
    dueDate: ''
  });
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDropdownData();
      if (mode === 'edit' && task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          priority: task.priority || 'Medium',
          status: task.status || 'To Do',
          projectId: task.projectId?._id || '',
          assignedTo: task.assignedTo?._id || '',
          dueDate: task.dueDate?.slice(0, 10) || ''
        });
      } else {
        setFormData({
          title: '',
          description: '',
          priority: 'Medium',
          status: 'To Do',
          projectId: '',
          assignedTo: '',
          dueDate: ''
        });
      }
      setError('');
    }
  }, [isOpen, mode, task]);

  const fetchDropdownData = async () => {
    try {
      const [projectsRes, employeesRes] = await Promise.all([
        api.get('/projects'),
        api.get('/employees')
      ]);
      setProjects(projectsRes.data.projects);
      setEmployees(employeesRes.data.employees);
    } catch (err) {
      setError('Failed to load projects or employees');
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'add') {
        await api.post('/tasks', formData);
      } else {
        await api.put(`/tasks/${task._id}`, formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Create New Task' : 'Edit Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
            <input
              type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500 min-h-20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project</label>
            <select
              name="projectId" value={formData.projectId} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Assign To</label>
            <select
              name="assignedTo" value={formData.assignedTo} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>{emp.name} ({emp.department})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                name="priority" value={formData.priority} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                name="status" value={formData.status} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
            <input
              type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">⚠ {error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white font-medium">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50">
              {submitting ? 'Saving...' : mode === 'add' ? 'Create Task' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;