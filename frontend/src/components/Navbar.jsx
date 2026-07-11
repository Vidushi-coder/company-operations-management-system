import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadgeColor = {
    Admin: 'bg-purple-900 text-purple-400',
    Manager: 'bg-blue-900 text-blue-400',
    Employee: 'bg-green-900 text-green-400'
  };

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6 ml-64">
      <h2 className="text-white font-semibold text-lg">
        Company Operations Management System
      </h2>

      <div className="flex items-center gap-4">
        <NotificationBell />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium leading-none">{user?.name}</p>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${roleBadgeColor[user?.role] || 'bg-gray-700 text-gray-300'}`}>
                {user?.role}
              </span>
            </div>
            <span className="text-gray-500 text-xs">▼</span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-white text-sm font-medium">{user?.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;