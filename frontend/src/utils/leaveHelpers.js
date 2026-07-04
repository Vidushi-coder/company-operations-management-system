export function getLeaveStatusBadge(status) {
  switch (status) {
    case 'Approved':
      return 'bg-green-900 text-green-400';
    case 'Rejected':
      return 'bg-red-900 text-red-400';
    case 'Pending':
    default:
      return 'bg-yellow-900 text-yellow-400';
  }
}

export function calculateDays(fromDate, toDate) {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}