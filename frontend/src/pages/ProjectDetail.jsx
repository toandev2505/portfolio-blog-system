import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, User, ExternalLink } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function ProjectDetail() {
  const { id } = useParams(); // Lấy id từ URL (ví dụ: /projects/1)
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy trạng thái đăng nhập & phân quyền từ localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  // Gọi API lấy thông tin chi tiết dự án
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        // Gọi tới API public lấy chi tiết dự án
        const response = await axiosInstance.get(`/v1/public/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết dự án:", err);
        setError("Không thể tải thông tin dự án hoặc dự án không tồn tại.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  // Hàm xử lý xóa dự án (Chỉ Admin)
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn dự án này không?")) {
      try {
        await axiosInstance.delete(`/v1/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Xóa dự án thành công!");
        navigate('/projects'); // Quay lại trang danh sách
      } catch (err) {
        console.error("Lỗi khi xóa:", err);
        alert("Xóa thất bại! Bạn không có quyền hoặc phiên đăng nhập hết hạn.");
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Đang tải thông tin dự án...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-medium">{error}</div>;
  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">

      {/* THANH ĐIỀU HƯỚNG QUAY LẠI & NÚT QUẢN TRỊ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Link to="/projects" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
          <ArrowLeft size={16} /> Quay lại danh sách dự án
        </Link>

        {/* Khối chức năng Thêm/Xóa/Sửa dành riêng cho ADMIN */}
        {isAdmin && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate(`/admin/projects/edit/${id}`)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              <Edit2 size={14} /> Chỉnh sửa
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              <Trash2 size={14} /> Xóa dự án
            </button>
          </div>
        )}
      </div>

      {/* BANNER ẢNH DỰ ÁN */}
      <div className="w-full h-64 sm:h-96 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8">
        <img 
          src={project.thumbnailLink || 'https://via.placeholder.com/800x400'} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* NỘI DUNG CHI TIẾT */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Cột trái: Tiêu đề và Mô tả chi tiết */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-xs text-gray-400">Project ID: #{project.id}</p>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Mô tả dự án</h3>
            {/* Giữ nguyên định dạng xuống dòng của văn bản mô tả */}
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Cột phải: Thông tin Meta & Links bổ sung */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Thông tin chung</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-gray-600">
                <User size={16} className="text-gray-400 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Vai trò</span>
                  <span className="font-medium text-gray-800">{project.role || 'Developer'}</span>
                </div>
              </div>

              {project.createdAt && (
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Calendar size={16} className="text-gray-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-gray-400">Thời gian</span>
                    <span className="font-medium text-gray-800">{project.createdAt}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Khối Công nghệ ứng dụng */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Công nghệ</span>
              <div className="flex flex-wrap gap-1.5">
                {project.techList && project.techList.map((tech, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded font-medium border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Khối Links (GitHub, Demo) */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Liên kết nhanh</span>
              <div className="flex flex-col gap-2">
              {project.githubLink && (
                <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
                >
                    {/* Mã SVG chuẩn thay thế hoàn toàn cho icon Lucide */}
                    <svg 
                    className="w-4 h-4 shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    >
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                </a>
                )}
                {project.demoLink && (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    <ExternalLink size={16} /> Trải nghiệm Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}