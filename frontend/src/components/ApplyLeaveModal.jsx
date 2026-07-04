import { useState } from 'react';
import api from '../api/axios';

function ApplyLeaveModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    fromDate: '',
    toDate: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      setError('End date cannot be before start date');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/leave', formData);
      onSuccess();
      onClose();
      setFormData({ leaveType: 'Sick Leave', fromDate: '', toDate: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Apply for Leave</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Leave Type</label>
            <select
              name="leaveType" value={formData.leaveType} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
              <input
                type="date" name="fromDate" value={formData.fromDate} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
              <input
                type="date" name="toDate" value={formData.toDate} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Reason</label>
            <textarea
              name="reason" value={formData.reason} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500 min-h-24"
              placeholder="Briefly describe the reason for your leave..."
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
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeaveModal;