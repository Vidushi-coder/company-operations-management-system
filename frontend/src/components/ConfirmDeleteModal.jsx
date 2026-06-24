function ConfirmDeleteModal({ isOpen, employeeName, onCancel, onConfirm, deleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-white mb-2">Delete Employee</h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete <span className="text-white font-medium">{employeeName}</span>?
          This will also remove their login account. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}
            className="px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 text-white font-medium">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={deleting}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50">
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;