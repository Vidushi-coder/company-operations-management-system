import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getDisplayStatus } from '../utils/projectHelpers';
import ProjectFormModal from '../components/ProjectFormModal';
import AssignMemberModal from '../components/AssignMemberModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.project);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleRemoveMember = async (employeeId) => {
    try {
      await api.delete(`/projects/${id}/members/${employeeId}`);
      fetchProject();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove member');
    }
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/projects/${id}`);
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
      setDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  if (loading) {
    return <DashboardLayout><p className="text-gray-400">Loading...</p></DashboardLayout>;
  }

  if (error || !project) {
    return <DashboardLayout><p className="text-red-400">⚠ {error || 'Project not found'}</p></DashboardLayout>;
  }

  const { label, classes } = getDisplayStatus(project);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-start mb-6">
        <div>
          <button onClick={() => navigate('/projects')} className="text-gray-400 hover:text-white text-sm mb-2">
            ← Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-white">{project.title}</h1>
        </div>

        {canManage && (
          <div className="flex gap-2">
            <button onClick={() => setIsEditOpen(true)}
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm font-medium">
              Edit
            </button>
            <button onClick={() => setIsDeleteOpen(true)}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${classes}`}>{label}</span>
          <span className="text-gray-400 text-sm">📅 Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
          <span className="text-gray-400 text-sm">Start: {new Date(project.startDate).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-300">{project.description}</p>
        <p className="text-xs text-gray-500 mt-3">
          Created by {project.createdBy?.name} ({project.createdBy?.role})
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold">Assigned Members</h3>
            {canManage && (
              <button onClick={() => setIsAssignOpen(true)}
                className="text-xs px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium">
                + Assign Member
              </button>
            )}
          </div>

          {project.members?.length === 0 ? (
            <p className="text-gray-500 text-sm">No members assigned yet</p>
          ) : (
            <ul className="space-y-2">
              {project.members.map((member) => (
                <li key={member._id} className="flex justify-between items-center text-sm text-gray-300">
                  <span>{member.name} <span className="text-gray-500">({member.department})</span></span>
                  {canManage && (
                    <button onClick={() => handleRemoveMember(member._id)} className="text-red-400 hover:text-red-300 text-xs">
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
          <h3 className="text-white font-semibold mb-3">Tasks Overview</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">To Do</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500">Done</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">(Available once Task Management module is built)</p>
        </div>
      </div>

      <ProjectFormModal
        isOpen={isEditOpen}
        mode="edit"
        project={project}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchProject}
      />

      <AssignMemberModal
        isOpen={isAssignOpen}
        currentMembers={project.members || []}
        projectId={id}
        onClose={() => setIsAssignOpen(false)}
        onSuccess={fetchProject}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        employeeName={project.title}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />
    </DashboardLayout>
  );
}

export default ProjectDetail;