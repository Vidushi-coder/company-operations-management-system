import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { user } = useAuth();

  const dashboardPath =
    user?.role === 'Admin' ? '/admin-dashboard' :
    user?.role === 'Manager' ? '/manager-dashboard' :
    '/employee-dashboard';

  const navItems = [
    { label: 'Dashboard', path: dashboardPath, icon: '🏠' },
    ...(user?.role !== 'Employee' ? [{ label: 'Employees', path: '/employees', icon: '👥' }] : []),
    { label: 'Projects', path: '/projects', icon: '📁' },
    { label: 'Tasks', path: '/tasks', icon: '✅' },
    { label: 'Leave', path: '/leave', icon: '📅' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-700 fixed left-0 top-0 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">Company Ops</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 mx-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {user?.role === 'Admin' && (
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 mx-2 rounded-md text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>📊</span>
            Reports
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;