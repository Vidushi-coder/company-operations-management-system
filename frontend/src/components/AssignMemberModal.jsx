import { useState, useEffect } from 'react';
import api from '../api/axios';

function AssignMemberModal({ isOpen, currentMembers, onClose, onSuccess, projectId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchEmployees = async () => {
        try {
          const response = await api.get('/employees');
          setEmployees(response.data.employees);
        } catch (err) {
          setError('Failed to load employee list');
        }
      };
      fetchEmployees();
      setSelectedId('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentMemberIds = currentMembers.map((m) => m._id);
  const availableEmployees = employees.filter((emp) => !currentMemberIds.includes(emp._id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      setError('Please select an employee');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await api.post(`/projects/${projectId}/assign-member`, { employeeId: selectedId });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assign member');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Assign Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Employee</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
            >
              <option value="">-- Select an employee --</option>
              {availableEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.department})
                </option>
              ))}
            </select>
            {availableEmployees.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">All employees are already assigned to this project</p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">⚠ {error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white font-medium">
              Cancel
            </button>
            <button type="submit" disabled={submitting || availableEmployees.length === 0}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50">
              {submitting ? 'Assigning...' : 'Assign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignMemberModal;