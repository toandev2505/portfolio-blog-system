import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, LogIn, Menu, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import logoImg from '../../assets/logo.png';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State cho mobile menu
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const currentUsername = localStorage.getItem('username') || 'guest';
  const isAdmin = token && userRole === 'ADMIN';

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    toast.success('Đã đăng xuất!');
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/projects', name: 'Projects' },
    { path: '/resume', name: 'Resume' },
    { path: '/blog', name: 'Blog' },
    { path: '/about', name: 'About Me' }
  ];

  // Danh sách thông báo theo các trạng thái chuẩn hệ thống HEMIS (Draft, Pending, Rejected, Verified, Published)
  const mockNotifications = [
    { id: 1, text: 'Your thesis record status changed to Published.', time: '2 hours ago', status: 'Published' },
    { id: 2, text: 'Record updated: Status changed to Pending review.', time: '1 day ago', status: 'Pending' },
    { id: 3, text: 'Draft submission #104 was Rejected by supervisor.', time: '2 days ago', status: 'Rejected' }
  ];

  return (
    <nav className="border-b border-green-500/15 sticky top-0 bg-slate-900/70 backdrop-blur-md z-50 select-none text-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="font-bold text-lg flex items-center gap-2 hover:text-lime-400 transition-colors">
          <img src={logoImg} alt="Logo" className="w-6 h-6 object-contain" />
          MyPortfolio
        </Link>

        {/* DESKTOP MENU LINKS */}
        <div className="hidden md:flex flex-1 justify-center space-x-2 text-sm font-medium">
          {navLinks.map((item) => (
            <NavLink key={item.path} to={item.path} end className={({ isActive }) => 
              `px-4 py-2 rounded-md transition-all ${isActive ? 'text-lime-400 font-bold' : 'text-slate-300 hover:text-lime-400'}`
            }>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* ACTION BUTTONS & HAMBURGER */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Actions (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Button */}
          <button className="p-2 hover:text-lime-400 rounded-full hover:bg-slate-800/50 transition-colors" aria-label="Search">
            <Search size={19} />
          </button>
          
          {/* Notification Bell */}
          {token && (
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className={`p-2 rounded-full hover:bg-slate-800/50 transition-colors ${showNotifications ? 'text-lime-400 bg-slate-800/40' : ''}`}
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 border border-green-500/20 rounded-lg shadow-2xl py-2 z-50 backdrop-blur-lg animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-4 py-1.5 font-bold text-sm border-b border-green-500/15 text-green-400">Notifications</div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((noti) => (
                      <div key={noti.id} className="px-4 py-3 hover:bg-slate-800/50 border-b border-slate-800/60 last:border-0 cursor-pointer transition-colors">
                        <p className="text-xs text-slate-200 leading-snug">{noti.text}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">{noti.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ĐÃ ĐĂNG NHẬP VS CHƯA ĐĂNG NHẬP */}
          {token ? (
            <div className="relative">
              <button 
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className={`p-1 border rounded-full transition-colors flex items-center justify-center bg-slate-800/40 ${showUserMenu ? 'border-lime-400' : 'border-slate-700 hover:border-lime-400'}`}
                aria-label="User profile"
              >
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                  {isAdmin ? 'AD' : 'US'}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 border border-green-500/20 rounded-lg shadow-2xl py-1 z-50 text-sm backdrop-blur-lg animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-4 py-2 border-b border-green-500/15 font-semibold text-slate-200 flex flex-col">
                    <span className="text-xs text-slate-400 font-normal">Quyền hạn:</span>
                    <span className="text-green-400 text-xs tracking-wider">{userRole}</span>
                  </div>
                  
                  <Link 
                    to={`/profile/${currentUsername}`} 
                    onClick={() => setShowUserMenu(false)} 
                    className="px-4 py-2 text-slate-300 hover:bg-slate-800/60 hover:text-lime-400 flex items-center gap-2 transition-colors"
                  >
                    <User size={16} /> My Profile
                  </Link>
                  
                  <Link to="/settings" onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-slate-300 hover:bg-slate-800/60 hover:text-lime-400 flex items-center gap-2 transition-colors">
                    <Settings size={16} /> Settings
                  </Link>
                  
                  <hr className="border-green-500/15" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-950/40 flex items-center gap-2 transition-colors font-medium"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1.5 bg-green-700/80 hover:bg-green-600 border border-green-500/30 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md active:scale-95"
            >
              <LogIn size={14} />
              Đăng nhập
            </Link>
          )}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-green-500/15 p-4 flex flex-col space-y-2 animate-in slide-in-from-top-4">
          {navLinks.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg hover:text-lime-400"
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-700">
            {token ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors font-bold"
              >
                <LogOut size={18} /> Sign out
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-700/80 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
              >
                <LogIn size={18} /> Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}