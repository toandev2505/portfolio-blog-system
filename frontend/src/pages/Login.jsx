import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import axiosInstance from '../api/axiosConfig';
import { Link } from 'react-router-dom';
import bgImg from '../assets/rocklee-bg.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      toast.error('Vui lòng điền đầy đủ tài khoản và mật khẩu!');
      setLoading(false);
      return;
    }

    try {
      // 1. Gọi API
      const response = await axiosInstance.post('/auth/login', { username, password });
      
      // 2. Lấy dữ liệu từ response
      const { accessToken, role } = response.data;
      
      // 3. LƯU LOGIC VÀO BROWSER (Đây là phần bạn đang bị thiếu)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      // 4. Thông báo và điều hướng
      toast.success('Đăng nhập thành công!');
      
      // Chuyển hướng về trang chủ
      window.location.href = '/'; 
    } catch (err) {
      // Xử lý lỗi chi tiết
      const errorMessage = err.response?.data?.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          backgroundImage: `url('${bgImg}')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/70" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-green-500/20 shadow-2xl">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Login</h2>
          <p className="mt-2 text-sm text-slate-400">Hãy cho tôi biết Bạn là ai?</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Input Tài khoản */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Tài khoản</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 py-2.5 bg-black/40 border border-green-500/20 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                  placeholder="Username"
                />
              </div>
            </div>

            {/* Input Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 bg-black/40 border border-green-500/20 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-green-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-green-700/80 hover:bg-green-600 text-white font-bold rounded-lg border border-green-500/30 transition-all active:scale-95 shadow-lg"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-green-400 font-semibold hover:underline transition-all">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-slate-400 hover:text-green-400 flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft size={16} /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}