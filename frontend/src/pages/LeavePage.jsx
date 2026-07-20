import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import ApplyLeaveModal from '../components/ApplyLeaveModal';
import LeaveRequestRow from '../components/LeaveRequestRow';
import { useAuth } from '../context/AuthContext';
import { getLeaveStatusBadge, calculateDays } from '../utils/leaveHelpers';

function LeavePage() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [cancelling, setCancelling] = useState(null);
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const isManager = user?.role === 'Admin' || user?.role === 'Manager';

  const fetchLeaves = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (activeTab !== 'All') params.status = activeTab;
      const response = await api.get('/leave', { params });
      setLeaves(response.data.leaves);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [activeTab]);

  const handleCancel = async (leaveId) => {
    setCancelling(leaveId);
    try {
      await api.delete(`/leave/${leaveId}`);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel leave request');
    } finally {
      setCancelling(null);
    }
  };

  const handleApprove = async (leaveId) => {
    setApproving(leaveId);
    try {
      await api.put(`/leave/${leaveId}/approve`);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve leave request');
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (leaveId) => {
    setRejecting(leaveId);
    try {
      await api.put(`/leave/${leaveId}/reject`);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject leave request');
    } finally {
      setRejecting(null);
    }
  };

  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

  return (
    <DashboardLayout>

      {/* ── EMPLOYEE VIEW ── */}
      {!isManager && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">My Leave</h1>
            <button
              onClick={() => setIsApplyOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
            >
              + Apply for Leave
            </button>
          </div>

          {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">From</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">To</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Days</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Applied On</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : leaves.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-400">No leave requests found</td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm text-gray-200">{leave.leaveType}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{new Date(leave.fromDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{new Date(leave.toDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{calculateDays(leave.fromDate, leave.toDate)}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getLeaveStatusBadge(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">
                        {leave.status === 'Pending' && (
                          <button
                            onClick={() => handleCancel(leave._id)}
                            disabled={cancelling === leave._id}
                            className="text-red-400 hover:text-red-300 text-xs disabled:opacity-50"
                          >
                            {cancelling === leave._id ? 'Cancelling...' : 'Cancel'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <ApplyLeaveModal
            isOpen={isApplyOpen}
            onClose={() => setIsApplyOpen(false)}
            onSuccess={fetchLeaves}
          />
        </>
      )}

      {/* ── MANAGER VIEW ── */}
      {isManager && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Leave Requests</h1>
            {user?.role === 'Manager' && (
              <button
                onClick={() => setIsApplyOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
              >
                + Apply for Leave
              </button>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {error && <p className="text-sm text-red-400 mb-4">⚠ {error}</p>}

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Employee</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">From</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">To</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Days</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Applied On</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Reviewed By</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-6 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : leaves.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-6 text-center text-gray-400">
                      No {activeTab !== 'All' ? activeTab.toLowerCase() : ''} leave requests found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <LeaveRequestRow
                      key={leave._id}
                      leave={leave}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      approving={approving}
                      rejecting={rejecting}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <ApplyLeaveModal
            isOpen={isApplyOpen}
            onClose={() => setIsApplyOpen(false)}
            onSuccess={fetchLeaves}
          />
        </>
      )}

    </DashboardLayout>
  );
}

export default LeavePage;