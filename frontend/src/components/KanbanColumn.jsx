import TaskCard from './TaskCard';

function KanbanColumn({ title, tasks, onTaskClick }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600 text-sm text-center py-6">No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} onClick={() => onTaskClick(task)} />
        ))
      )}
    </div>
  );
}

export default KanbanColumn;