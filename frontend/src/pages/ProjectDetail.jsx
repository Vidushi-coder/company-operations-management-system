import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getDisplayStatus } from '../utils/projectHelpers';
import ProjectFormModal from '../components/ProjectFormModal';
import AssignMemberModal from '../components/AssignMemberModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import ProjectPredictionCard from '../components/ProjectPredictionCard';
import { useAuth } from '../context/AuthContext';

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

  const [tasks, setTasks] = useState([]);

  const canManage = user?.role === 'Admin' || user?.role === 'Manager';

  const fetchProject = async () => {
    setLoading(true);
    try {
      const [projectRes, taskRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks/project/${id}`)
      ]);
      setProject(projectRes.data.project);
      setTasks(taskRes.data.tasks);
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
              <p className="text-xl font-bold text-white">{tasks.filter((t) => t.status === 'To Do').length}</p>
              <p className="text-xs text-gray-500">To Do</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{tasks.filter((t) => t.status === 'In Progress').length}</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">{tasks.filter((t) => t.status === 'Done').length}</p>
              <p className="text-xs text-gray-500">Done</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">Total: {tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
          {tasks.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden overflow-x-auto mt-4">
              <div className="px-5 py-4 border-b border-gray-700">
                <h3 className="text-white font-semibold">Project Tasks</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Task</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Assignee</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Priority</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm text-gray-200">{task.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{task.assignedTo?.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-900 text-red-400' :
                          task.priority === 'Medium' ? 'bg-yellow-900 text-yellow-400' :
                            'bg-green-900 text-green-400'
                          }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-200">{task.status}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

      {/* AI Prediction Card — Admin and Manager only */}
      {canManage && (
        <div className="mt-4">
          <ProjectPredictionCard
            project={project}
            tasks={tasks}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProjectDetail;