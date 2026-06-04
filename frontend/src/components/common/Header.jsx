import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // 1. Đọc dữ liệu chứng thực và thông tin tài khoản từ localStorage
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const currentUsername = localStorage.getItem('username') || 'guest';
  const isAdmin = token && userRole === 'ADMIN';

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username'); 
    setShowUserMenu(false);
    alert('Đã đăng xuất thành công!');
    navigate('/'); 
  };

  // Danh sách thông báo theo các trạng thái chuẩn hệ thống HEMIS (Draft, Pending, Rejected, Verified, Published)
  const mockNotifications = [
    { id: 1, text: 'Your thesis record status changed to Published.', time: '2 hours ago', status: 'Published' },
    { id: 2, text: 'Record updated: Status changed to Pending review.', time: '1 day ago', status: 'Pending' },
    { id: 3, text: 'Draft submission #104 was Rejected by supervisor.', time: '2 days ago', status: 'Rejected' }
  ];

  return (
    <nav className="border-b border-green-500/15 sticky top-0 bg-slate-900/70 backdrop-blur-md z-50 select-none text-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO & MENU LINKS */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-bold text-lg flex items-center gap-2 text-slate-100 hover:text-lime-400 transition-colors">
            <img 
              src={logoImg} 
              alt="MyPortfolio Logo" 
              className="w-6 h-6 object-contain brightness-110"
            />
            MyPortfolio
          </Link>

          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-lime-400 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-lime-400 transition-colors">Projects</Link>
            <Link to="/resume" className="hover:text-lime-400 transition-colors">Resume</Link>
            <Link to="/blog" className="hover:text-lime-400 transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-lime-400 transition-colors">About Me</Link>
          </div>
        </div>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center space-x-3 text-slate-300 relative">
          
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
    </nav>
  );
}