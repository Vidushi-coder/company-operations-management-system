import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setEmployee(response.data.employee);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employee');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-400">Loading...</p>
      </DashboardLayout>
    );
  }

  if (error || !employee) {
    return (
      <DashboardLayout>
        <p className="text-red-400">⚠ {error || 'Employee not found'}</p>
      </DashboardLayout>
    );
  }

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

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <h3 className="text-white font-semibold mb-3">Assigned Projects</h3>
          <p className="text-gray-500 text-sm">No projects assigned yet</p>
          <p className="text-xs text-gray-600 mt-2">(Available once Project Management module is built)</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <h3 className="text-white font-semibold mb-3">Task Summary</h3>
          <p className="text-gray-500 text-sm">No tasks assigned yet</p>
          <p className="text-xs text-gray-600 mt-2">(Available once Task Management module is built)</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <h3 className="text-white font-semibold mb-3">Leave Summary</h3>
          <p className="text-gray-500 text-sm">No leave records yet</p>
          <p className="text-xs text-gray-600 mt-2">(Available once Leave Management module is built)</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeProfile;