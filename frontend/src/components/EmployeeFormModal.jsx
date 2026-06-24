import { useState, useEffect } from 'react';
import api from '../api/axios';

function EmployeeFormModal({ isOpen, mode, employee, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    department: '', designation: '', dateOfJoining: '',
    role: 'Employee', status: 'Active'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        password: '',
        phone: employee.phone || '',
        department: employee.department || '',
        designation: employee.designation || '',
        dateOfJoining: employee.dateOfJoining?.slice(0, 10) || '',
        role: employee.userId?.role || 'Employee',
        status: employee.status || 'Active'
      });
    } else {
      setFormData({
        name: '', email: '', password: '', phone: '',
        department: '', designation: '', dateOfJoining: '',
        role: 'Employee', status: 'Active'
      });
    }
    setError('');
  }, [mode, employee, isOpen]);

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
        await api.post('/employees', formData);
      } else {
        const { phone, department, designation, status } = formData;
        await api.put(`/employees/${employee._id}`, { phone, department, designation, status });
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
            {mode === 'add' ? 'Add New Employee' : 'Edit Employee'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange}
              disabled={mode === 'edit'}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white disabled:opacity-50 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange}
              disabled={mode === 'edit'}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white disabled:opacity-50 outline-none focus:border-blue-500"
              required
            />
          </div>

          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
            <input
              type="text" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
            <select
              name="department" value={formData.department} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Designation</label>
            <input
              type="text" name="designation" value={formData.designation} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date of Joining</label>
              <input
                type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
              <select
                name="role" value={formData.role} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}

          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                name="status" value={formData.status} onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}

          {error && <p className="text-sm text-red-400">⚠ {error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white font-medium">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50">
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeFormModal;