import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 ml-64">
      <h2 className="text-white font-semibold text-lg">
        Company Operations Management System
      </h2>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white text-xl">🔔</button>
        <div className="text-sm text-gray-300">
          {user?.name} <span className="text-gray-500">({user?.role})</span>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;