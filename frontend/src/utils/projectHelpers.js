export function getDisplayStatus(project) {
  const today = new Date();
  const deadline = new Date(project.deadline);

  if (project.status !== 'Completed' && deadline < today) {
    return { label: 'Overdue', classes: 'bg-red-900 text-red-400' };
  }

  switch (project.status) {
    case 'Active':
      return { label: 'Active', classes: 'bg-green-900 text-green-400' };
    case 'On Hold':
      return { label: 'On Hold', classes: 'bg-yellow-900 text-yellow-400' };
    case 'Completed':
      return { label: 'Completed', classes: 'bg-blue-900 text-blue-400' };
    default:
      return { label: 'Not Started', classes: 'bg-gray-700 text-gray-300' };
  }
}