import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';
import { useAuth } from '../context/AuthContext';
import { getDisplayStatus } from '../utils/projectHelpers';

function ProjectManagement() {
  const { user } = useAuth();
  const [allProjects, setAllProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter && statusFilter !== 'Overdue') params.status = statusFilter;

      const response = await api.get('/projects', { params });
      setAllProjects(response.data.projects);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (statusFilter === 'Overdue') {
      setDisplayedProjects(
        allProjects.filter((p) => getDisplayStatus(p).label === 'Overdue')
      );
    } else {
      setDisplayedProjects(allProjects);
    }
  }, [allProjects, statusFilter]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Projects</h1>

      <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by project name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
          <option value="Not Started">Not Started</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>

        {canManage && (
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
          >
            + Create New Project
          </button>
        )}
      </form>

      {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : displayedProjects.length === 0 ? (
        <p className="text-gray-400">No projects found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchProjects}
      />
    </DashboardLayout>
  );
}

export default ProjectManagement;