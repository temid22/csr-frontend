import { Menu, X, LogOut } from 'lucide-react';

export default function Header({ sidebarOpen, toggleSidebar, user }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
          {sidebarOpen ? <Menu size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center space-x-4">
          <img
            src={'https://randomuser.me/api/portraits/men/49.jpg'}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-700">{user.Name}</span>
          <LogOut className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
