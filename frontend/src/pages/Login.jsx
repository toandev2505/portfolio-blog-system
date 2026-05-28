import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function Login() {
  // 1. Khai báo các State quản lý Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Hàm xử lý khi người dùng nhấn nút Đăng Nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn trang web bị reload lại
    setError('');
    setLoading(true);

    // Kiểm tra dữ liệu đầu vào cơ bản trước khi gọi API
    if (!username || !password) {
      setError('Vui lòng điền đầy đủ tài khoản và mật khẩu!');
      setLoading(false);
      return;
    }

    try {
      // Gọi API Login tới Backend Spring Boot
      const response = await axiosInstance.post('/auth/login', {
        username: username,
        password: password
      });

      // Lấy dữ liệu trả về từ API thành công
      const { accessToken, role } = response.data;

      // Lưu trữ thông tin bảo mật vào localStorage của trình duyệt
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', role);

      alert('Đăng nhập thành công!');
      
      // Chuyển hướng người dùng về trang danh sách dự án (Project Management)
      window.location.href = '/';

    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      // Hiển thị thông báo lỗi trả về từ Backend (nếu có)
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Không thể kết nối đến máy chủ Backend. Vui lòng thử lại sau!');
      }
    } finally {
      setLoading(false); // Tắt trạng thái chờ loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {/* TIÊU ĐỀ FORM */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Đăng Nhập Hệ Thống
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Quản lý và cập nhật thông tin Portfolio của bạn
          </p>
        </div>

        {/* THÔNG BÁO LỖI (NẾU CÓ) */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM NHẬP LIỆU */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            
            {/* Trường Ô Nhập Tài Khoản */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>
            </div>

            {/* Trường Ô Nhập Mật Khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                  placeholder="••••••••"
                />
                {/* Nút ẩn/hiện mật khẩu trực quan */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

          </div>

          {/* NÚT ĐĂNG NHẬP THỰC THI */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-sm ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Đang xác thực thông tin...' : 'Đăng Nhập'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}