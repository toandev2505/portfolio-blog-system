import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Giả lập danh sách thông báo đúng theo các trạng thái (approved, rejected...) của HEMIS/Dự án
  const mockNotifications = [
    { id: 1, text: 'Your thesis document has been Published successfully.', time: '2 hours ago', status: 'published' },
    { id: 2, text: 'Record updated: Status changed to Pending review.', time: '1 day ago', status: 'pending' },
    { id: 3, text: 'Draft submission #104 was Rejected by supervisor.', time: '2 days ago', status: 'rejected' }
  ];

  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 select-none">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO & MENU LINKS */}
        <div className="flex items-center space-x-8">
          <a href="/" className="font-bold text-lg flex items-center gap-2 text-black hover:opacity-80 transition-opacity">
            <img 
              src={logoImg} 
              alt="MyPortfolio Logo" 
              className="w-6 h-6 object-contain"
            />
            MyPortfolio
          </a>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-brand-primary">
              Home
            </Link>

            <Link to="/projects" className="hover:text-brand-primary">
              Projects
            </Link>
            
            <Link to="/blog" className="hover:text-brand-primary">
              Blog
            </Link>

            <Link to="/resume" className="hover:text-brand-primary">
              Resume
            </Link>
          </div>
        </div>
        
        {/* ACTION BUTTONS (SEARCH, BELL, AVATAR) */}
        <div className="flex items-center space-x-3 text-gray-600 relative">
          
          {/* Search Button */}
          <button className="p-2 hover:text-black rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
            <Search size={19} />
          </button>
          
          {/* Notification Bell & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${showNotifications ? 'text-black bg-gray-50' : ''}`}
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                <div className="px-4 py-1.5 font-bold text-sm border-b border-gray-100 text-gray-800">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map((noti) => (
                    <div key={noti.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors">
                      <p className="text-xs text-gray-700 leading-snug">{noti.text}</p>
                      <span className="text-[10px] text-gray-400 block mt-1">{noti.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="p-1 border border-gray-300 rounded-full hover:border-black transition-colors flex items-center justify-center bg-gray-50"
              aria-label="User profile"
            >
              <User size={18} className="text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-sm">
                <div className="px-4 py-2 border-b border-gray-100 font-medium text-gray-800 block truncate">
                  john.doe@example.com
                </div>
                <a href="/profile" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2 transition-colors">
                  <User size={16} /> My Profile
                </a>
                <a href="/settings" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2 transition-colors">
                  <Settings size={16} /> Settings
                </a>
                <hr className="border-gray-100" />
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}