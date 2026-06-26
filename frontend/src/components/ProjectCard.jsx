import { useNavigate } from 'react-router-dom';
import { getDisplayStatus } from '../utils/projectHelpers';

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const { label, classes } = getDisplayStatus(project);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${classes}`}>
          {label}
        </span>
      </div>

      <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

      <div className="text-gray-400 text-sm flex items-center gap-1">
        📅 Deadline: {new Date(project.deadline).toLocaleDateString()}
      </div>

      <div className="text-gray-400 text-sm flex items-center gap-1">
        👥 {project.members?.length || 0} Member{project.members?.length === 1 ? '' : 's'}
      </div>

      <button
        onClick={() => navigate(`/projects/${project._id}`)}
        className="mt-2 px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm font-medium"
      >
        View Details
      </button>
    </div>
  );
}

export default ProjectCard;