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
  
  // Lấy chính xác username được lưu từ bước Đăng nhập (Ví dụ: "toandev2505")
  // Nếu chưa có, bạn nhớ bổ sung lệnh localStorage.setItem('username', data.username) ở hàm xử lý Login nhé.
  const currentUsername = localStorage.getItem('username') || 'guest';
  
  const isAdmin = token && userRole === 'ADMIN';

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username'); // Clear thêm username khi logout
    setShowUserMenu(false);
    alert('Đã đăng xuất thành công!');
    navigate('/'); 
  };

  // Giả lập danh sách thông báo theo các trạng thái chuẩn hệ thống
  const mockNotifications = [
    { id: 1, text: 'Your thesis record status changed to Published.', time: '2 hours ago', status: 'Published' },
    { id: 2, text: 'Record updated: Status changed to Pending review.', time: '1 day ago', status: 'Pending' },
    { id: 3, text: 'Draft submission #104 was Rejected by supervisor.', time: '2 days ago', status: 'Rejected' }
  ];

  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 select-none">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO & MENU LINKS */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-bold text-lg flex items-center gap-2 text-black hover:opacity-80 transition-opacity">
            <img 
              src={logoImg} 
              alt="MyPortfolio Logo" 
              className="w-6 h-6 object-contain"
            />
            MyPortfolio
          </Link>

          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link to="/resume" className="hover:text-blue-600 transition-colors">Resume</Link>
          </div>
        </div>
        
        {/* ACTION BUTTONS */}
        <div className="flex items-center space-x-3 text-gray-600 relative">
          
          {/* Search Button */}
          <button className="p-2 hover:text-black rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
            <Search size={19} />
          </button>
          
          {/* Notification Bell */}
          {token && (
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${showNotifications ? 'text-black bg-gray-50' : ''}`}
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
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
          )}

          {/* ĐÃ ĐĂNG NHẬP VS CHƯA ĐĂNG NHẬP */}
          {token ? (
            <div className="relative">
              <button 
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className={`p-1 border rounded-full transition-colors flex items-center justify-center bg-gray-50 ${showUserMenu ? 'border-black' : 'border-gray-300 hover:border-black'}`}
                aria-label="User profile"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {isAdmin ? 'AD' : 'US'}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 text-sm animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-800 flex flex-col">
                    <span className="text-xs text-gray-400 font-normal">Quyền hạn:</span>
                    <span className="text-blue-600 text-xs">{userRole}</span>
                  </div>
                  
                  {/* ĐÃ SỬA: Chuyển hướng động theo dạng Template String /profile/${currentUsername} */}
                  <Link 
                    to={`/profile/${currentUsername}`} 
                    onClick={() => setShowUserMenu(false)} 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2 transition-colors"
                  >
                    <User size={16} /> My Profile
                  </Link>
                  
                  <Link to="/settings" onClick={() => setShowUserMenu(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black flex items-center gap-2 transition-colors">
                    <Settings size={16} /> Settings
                  </Link>
                  
                  <hr className="border-gray-100" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm"
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