import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <Navbar />
      <div className="ml-64 p-6">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;