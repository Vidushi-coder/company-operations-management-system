function TaskCard({ task, onClick }) {
  const priorityClasses = {
    High: 'border-l-red-500',
    Medium: 'border-l-yellow-400',
    Low: 'border-l-green-500'
  };

  const priorityBadge = {
    High: 'bg-red-900 text-red-400',
    Medium: 'bg-yellow-900 text-yellow-400',
    Low: 'bg-green-900 text-green-400'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 border border-gray-700 border-l-4 ${priorityClasses[task.priority]} rounded-md p-3 mb-3 cursor-pointer hover:bg-gray-700`}
    >
      <p className="text-sm font-medium text-white mb-2">{task.title}</p>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>👤 {task.assignedTo?.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityBadge[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;