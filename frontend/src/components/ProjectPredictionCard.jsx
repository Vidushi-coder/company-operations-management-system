import { useState } from 'react';
import api from '../api/axios';

function ProjectPredictionCard({ project, tasks }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const memberCount = project.members?.length || 0;
  const taskCount = tasks?.length || 0;
  const highCount = tasks?.filter((t) => t.priority === 'High').length || 0;
  const mediumCount = tasks?.filter((t) => t.priority === 'Medium').length || 0;
  const lowCount = tasks?.filter((t) => t.priority === 'Low').length || 0;
  const doneCount = tasks?.filter((t) => t.status === 'Done').length || 0;
  const completionRate = taskCount > 0
    ? parseFloat((doneCount / taskCount).toFixed(2))
    : 0;

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    setPrediction(null);
    try {
      const response = await api.post('/ml/predict', {
        team_size: memberCount,
        task_count: taskCount,
        high_priority_count: highCount,
        medium_priority_count: mediumCount,
        low_priority_count: lowCount,
        completion_rate: completionRate
      });
      setPrediction(response.data);
      setApplied(false);
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (msg.includes('unavailable')) {
        setError(
          'The prediction service is currently unavailable. ' +
          'If running locally, ensure the Flask API is running on port 5001.'
        );
      } else {
        setError(msg || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDeadline = async () => {
    if (!prediction?.suggested_deadline) return;
    setApplying(true);
    try {
      await api.put(`/projects/${project._id}`, {
        title: project.title,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        deadline: prediction.suggested_deadline
      });
      setApplied(true);
    } catch (err) {
      setError('Failed to apply deadline. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  // State 1 — No members and no tasks
  if (memberCount === 0 && taskCount === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤖</span>
          <h3 className="text-white font-semibold">
            AI Project Completion Predictor
          </h3>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-3">
            Not enough project information is available.
          </p>
          <p className="text-gray-500 text-sm">Assign at least:</p>
          <ul className="text-gray-500 text-sm mt-2 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="text-gray-600">○</span>
              1 team member
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-600">○</span>
              1 task
            </li>
          </ul>
          <p className="text-gray-600 text-xs mt-3">
            to generate an estimated completion time.
          </p>
        </div>
      </div>
    );
  }

  // State 2 — Members exist but no tasks
  if (memberCount >= 1 && taskCount === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤖</span>
          <h3 className="text-white font-semibold">
            AI Project Completion Predictor
          </h3>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-yellow-400 text-sm font-medium mb-1">
            Project planning is incomplete.
          </p>
          <p className="text-gray-400 text-sm mb-3">
            Please create at least one task before generating a prediction.
          </p>
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              {memberCount} member{memberCount !== 1 ? 's' : ''} assigned
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">○</span>
              No tasks created yet
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 3 — Tasks exist but no members
  if (memberCount === 0 && taskCount >= 1) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤖</span>
          <h3 className="text-white font-semibold">
            AI Project Completion Predictor
          </h3>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-yellow-400 text-sm font-medium mb-1">
            No team assigned yet.
          </p>
          <p className="text-gray-400 text-sm mb-3">
            Assign at least one employee to the project before generating
            an estimate.
          </p>
          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">○</span>
              No members assigned yet
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              {taskCount} task{taskCount !== 1 ? 's' : ''} created
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 4 — Ready for prediction
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="text-white font-semibold">
          AI Project Completion Predictor
        </h3>
      </div>

      {/* Project Metrics */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">
          Project Metrics
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Team Size</span>
            <span className="text-white font-medium">{memberCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Tasks</span>
            <span className="text-white font-medium">{taskCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">High Priority</span>
            <span className="text-red-400 font-medium">{highCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Medium Priority</span>
            <span className="text-yellow-400 font-medium">{mediumCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Low Priority</span>
            <span className="text-green-400 font-medium">{lowCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Completed</span>
            <span className="text-blue-400 font-medium">
              {doneCount}/{taskCount} ({Math.round(completionRate * 100)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm mb-2">⚠ {error}</p>
          <button
            onClick={() => setError('')}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && !error && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-3">
            Prediction Result
          </p>

          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div>
              <p className="text-2xl font-bold text-white">
                {prediction.predicted_days}
              </p>
              <p className="text-gray-500 text-xs mt-1">Estimated Days</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                {formatDate(prediction.suggested_deadline)}
              </p>
              <p className="text-gray-500 text-xs mt-1">Suggested Deadline</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                {prediction.confidence}%
              </p>
              <p className="text-gray-500 text-xs mt-1">Confidence</p>
            </div>
          </div>

          {/* Deadline comparison */}
          {project.deadline && (
            <div className="mb-3 px-3 py-2 rounded-md bg-gray-800 text-xs">
              {new Date(prediction.suggested_deadline).toDateString() ===
               new Date(project.deadline).toDateString() ? (
                <p className="text-green-400">
                  ✅ Current deadline matches the AI suggestion
                </p>
              ) : (
                <p className="text-yellow-400">
                  ⚠ Current deadline: {formatDate(project.deadline)} —
                  AI suggests {formatDate(prediction.suggested_deadline)}
                </p>
              )}
            </div>
          )}

          {applied ? (
            <div className="flex items-center justify-center gap-2 py-2 bg-green-900/20 rounded-md border border-green-800">
              <span className="text-green-400 text-sm">
                ✅ Deadline updated to {formatDate(prediction.suggested_deadline)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleApplyDeadline}
              disabled={applying}
              className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50 transition"
            >
              {applying ? 'Applying...' : '📅 Apply Deadline to Project'}
            </button>
          )}
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handlePredict}
        disabled={loading}
        className="w-full py-2.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating estimate...
          </span>
        ) : (
          <>🔮 {prediction ? 'Regenerate Estimate' : 'Generate Estimate'}</>
        )}
      </button>

      <p className="text-gray-600 text-xs text-center mt-2">
        Powered by Random Forest ML · trained on 500 synthetic project records
      </p>
    </div>
  );
}

export default ProjectPredictionCard;