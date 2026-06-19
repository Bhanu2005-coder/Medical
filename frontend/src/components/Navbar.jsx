import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Affordmed
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/doctors" className="text-gray-600 hover:text-primary font-medium transition-colors">Find Doctors</Link>
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-primary font-medium transition-colors">Admin Panel</Link>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium transition-colors">Dashboard</Link>
                    <Link to="/appointments" className="text-gray-600 hover:text-primary font-medium transition-colors">Appointments</Link>
                  </>
                )}
                <div className="flex items-center gap-4 ml-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    {user.name}
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-primary hover:text-secondary font-medium transition-colors">Login</Link>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
