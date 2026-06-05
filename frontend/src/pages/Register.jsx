import React, { useState } from 'react';
import { User, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axiosInstance from '../api/axiosConfig';
import bgImg from '../assets/rocklee-bg.png';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axiosInstance.post('/auth/register', formData);
      toast.success('Đăng ký tài khoản thành công!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Đăng ký thất bại, vui lòng thử lại!');
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
      
      {/* Overlay làm tối ảnh nền */}
      <div className="fixed inset-0 z-0 bg-black/70" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-md w-full space-y-8 bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-green-500/20 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Đăng Ký</h2>
          <p className="mt-2 text-sm text-slate-400">Tạo tài khoản mới để bắt đầu</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Tài khoản</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><User size={18} /></div>
                <input
                  type="text"
                  required
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="block w-full pl-10 py-2.5 bg-black/40 border border-green-500/20 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                  placeholder="Nhập username..."
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><Mail size={18} /></div>
                <input
                  type="email"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 py-2.5 bg-black/40 border border-green-500/20 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500"><Lock size={18} /></div>
                <input
                  type="password"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 py-2.5 bg-black/40 border border-green-500/20 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-green-700/80 hover:bg-green-600 text-white font-bold rounded-lg border border-green-500/30 transition-all shadow-lg active:scale-95"
          >
            {loading ? 'Đang xử lý...' : 'Đăng Ký Tài Khoản'}
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-green-400 font-semibold hover:underline transition-all">
                Đăng nhập tại đây
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