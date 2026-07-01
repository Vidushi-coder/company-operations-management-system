import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function TaskDetailModal({ isOpen, task, onClose, onSuccess, onEdit, onDelete }) {
  const { user } = useAuth();
  const [status, setStatus] = useState(task?.status || 'To Do');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !task) return null;

  const canManage = user?.role === 'Admin' || user?.role === 'Manager';
  const isAssignedToMe = task.assignedTo?.name === user?.name;

  const priorityBadge = {
    High: 'bg-red-900 text-red-400',
    Medium: 'bg-yellow-900 text-yellow-400',
    Low: 'bg-green-900 text-green-400'
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    setError('');
    try {
      await api.put(`/tasks/${task._id}`, { status });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Task Detail</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Title</p>
            <p className="text-white font-medium">{task.title}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Description</p>
            <p className="text-gray-300 text-sm">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Project</p>
              <p className="text-gray-300 text-sm">{task.projectId?.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Assigned To</p>
              <p className="text-gray-300 text-sm">{task.assignedTo?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Priority</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityBadge[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Due Date</p>
              <p className="text-gray-300 text-sm">{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Created By</p>
              <p className="text-gray-300 text-sm">{task.createdBy?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Created At</p>
              <p className="text-gray-300 text-sm">{new Date(task.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
            {canManage || isAssignedToMe ? (
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none text-sm"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating || status === task.status}
                  className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Update'}
                </button>
              </div>
            ) : (
              <p className="text-gray-300 text-sm">{task.status}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">⚠ {error}</p>}
        </div>

        {canManage && (
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button onClick={onEdit}
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm font-medium">
              Edit
            </button>
            <button onClick={onDelete}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetailModal;