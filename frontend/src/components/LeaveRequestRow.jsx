import { getLeaveStatusBadge, calculateDays } from '../utils/leaveHelpers';

function LeaveRequestRow({ leave, onApprove, onReject, approving, rejecting, isOwnLeave }) {
  const isPending = leave.status === 'Pending';

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700">
      <td className="px-4 py-3 text-sm text-gray-200">
        {leave.employeeId?.name}
        <span className="block text-xs text-gray-500">{leave.employeeId?.department}</span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-200">{leave.leaveType}</td>
      <td className="px-4 py-3 text-sm text-gray-200">
        {new Date(leave.fromDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-sm text-gray-200">
        {new Date(leave.toDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-sm text-gray-200">
        {calculateDays(leave.fromDate, leave.toDate)}
      </td>
      <td className="px-4 py-3 text-sm">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getLeaveStatusBadge(leave.status)}`}>
          {leave.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {new Date(leave.appliedAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {leave.reviewedBy?.name || '—'}
      </td>
      <td className="px-4 py-3 text-sm">
        {isPending && !isOwnLeave ? (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(leave._id)}
              disabled={approving === leave._id || rejecting === leave._id}
              className="text-xs px-3 py-1 rounded-md bg-green-700 hover:bg-green-600 text-white font-medium disabled:opacity-50"
            >
              {approving === leave._id ? 'Approving...' : '✅ Approve'}
            </button>
            <button
              onClick={() => onReject(leave._id)}
              disabled={approving === leave._id || rejecting === leave._id}
              className="text-xs px-3 py-1 rounded-md bg-red-700 hover:bg-red-600 text-white font-medium disabled:opacity-50"
            >
              {rejecting === leave._id ? 'Rejecting...' : '❌ Reject'}
            </button>
          </div>
        ) : isPending && isOwnLeave ? (
          <span className="text-xs text-gray-500 italic">Your request</span>
        ) : (
          <span className="text-xs text-gray-500">—</span>
        )}
      </td>
    </tr>
  );
}

export default LeaveRequestRow;