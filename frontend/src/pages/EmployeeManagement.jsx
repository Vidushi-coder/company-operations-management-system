import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EmployeeFormModal from '../components/EmployeeFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

function EmployeeManagement() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (department) params.department = department;
      if (status) params.status = status;

      const response = await api.get('/employees', { params });
      setEmployees(response.data.employees);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEmployees();
  };

  const handleAddClick = () => {
    setFormMode('add');
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (emp) => {
    setFormMode('edit');
    setSelectedEmployee(emp);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (emp) => {
    setDeleteTarget(emp);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/employees/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Employee Management</h1>

      <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 outline-none"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>

        {user?.role === 'Admin' && (
          <button
            type="button"
            onClick={handleAddClick}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
          >
            + Add Employee
          </button>
        )}
      </form>

      {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Department</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Role</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-200">{emp.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-200">{emp.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-200">{emp.userId?.role}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${emp.status === 'Active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                      }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    <button onClick={() => navigate(`/employees/${emp._id}`)} className="text-blue-400 hover:text-blue-300">👁</button>
                    {user?.role === 'Admin' && (
                      <>
                        <button onClick={() => handleEditClick(emp)} className="text-yellow-400 hover:text-yellow-300">✏</button>
                        <button onClick={() => handleDeleteClick(emp)} className="text-red-400 hover:text-red-300">🗑</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EmployeeFormModal
        isOpen={isFormOpen}
        mode={formMode}
        employee={selectedEmployee}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchEmployees}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        employeeName={deleteTarget?.name}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />

    </DashboardLayout>
  );
}

export default EmployeeManagement;