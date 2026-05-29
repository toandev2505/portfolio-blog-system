import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit2, Trash2, Calendar, User, 
  ExternalLink, Users, Layers, Star, Layers3, Image 
} from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function ProjectDetail() {
  const { slug } = useParams(); // SỬA: Lấy 'slug' từ cấu hình URL (ví dụ: /projects/he-thong-hemis)
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trạng thái xác thực từ localStorage
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ROLE_ADMIN'; // Lưu ý: Đồng bộ chuỗi ROLE_ADMIN chuẩn Spring Security

  // Gọi API lấy dữ liệu chi tiết dựa trên Slug
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        // Gọi API Public lấy dữ liệu theo slug thay vì ID
        const response = await axiosInstance.get(`/v1/public/projects/${slug}`);
        setProject(response.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết dự án:", err);
        setError("Không thể tải thông tin dự án hoặc dự án không tồn tại.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProjectDetail();
  }, [slug]);

  // Xử lý xóa dự án (Sử dụng ID thực tế bóc tách từ Object trả về)
  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn dự án này không?")) {
      try {
        await axiosInstance.delete(`/v1/admin/projects/${project.id}`);
        alert("Xóa dự án thành công!");
        navigate('/projects'); 
      } catch (err) {
        console.error("Lỗi khi xóa:", err);
        alert("Xóa thất bại! Vui lòng kiểm tra lại quyền Admin.");
      }
    }
  };

  // Hàm tiện ích phân tách chuỗi text công nghệ thành mảng (Đề phòng backend trả về chuỗi text thô)
  const renderTechTags = () => {
    if (!project.techList || project.techList.length === 0) return null;
    return project.techList.map((tech, idx) => (
      <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded font-medium border border-blue-100">
        {tech}
      </span>
    ));
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Đang tải thông tin dự án...</div>;
  if (error) return <div className="text-center py-20 text-red-500 font-medium">{error}</div>;
  if (!project) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">

      {/* THANH ĐIỀU HƯỚNG QUAY LẠI & NÚT QUẢN TRỊ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Link to="/projects" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
          <ArrowLeft size={16} /> Quay lại danh sách dự án
        </Link>

        {isAdmin && (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate(`/project/edit?id=${project.id}`)}
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

      {/* CẤU TRÚC NỘI DUNG HAI CỘT */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: NỘI DUNG CHI TIẾT CHÍNH */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Mã dự án: #{project.id}</span>
              <span>•</span>
              <span className="font-mono bg-gray-50 px-2 py-0.5 border rounded">Slug: {project.slug}</span>
            </div>
          </div>

          {/* 1. KHỐI MÔ TẢ DỰ ÁN */}
          <div className="prose max-w-none">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1.5 flex items-center gap-2">
              <Layers size={18} className="text-blue-500" /> Mô tả chi tiết dự án
            </h3>
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {project.description || 'Chưa có thông tin mô tả chi tiết cho dự án này.'}
            </p>
          </div>

          {/* 2. KHỐI TÍNH NĂNG NỔI BẬT */}
          {project.highlightFeatures && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1.5 flex items-center gap-2">
                <Star size={18} className="text-amber-500 fill-amber-500" /> Tính năng nổi bật
              </h3>
              <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line bg-amber-50/40 p-4 border border-amber-100 rounded-xl">
                {project.highlightFeatures}
              </p>
            </div>
          )}

          {/* 3. KHỐI SƠ ĐỒ HỆ THỐNG VÀ LƯU ĐỒ (DIAGRAM LINKS) */}
          {project.diagramLinks && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Layers3 size={18} className="text-indigo-500" /> Bản vẽ thiết kế & Sơ đồ hệ thống
                </h3>
                <p className="text-xs text-gray-500 mt-1">Hệ thống tài liệu trực quan bao gồm UseCase, sơ đồ luồng dữ liệu DFD và kiến trúc phân tầng.</p>
              </div>
              
              <div className="pt-2">
                <a 
                  href={project.diagramLinks} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  <Image size={16} /> Xem Sơ đồ Hệ thống (Diagrams)
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI: THÔNG TIN BỔ TRỢ (META WIDGETS) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Thông số dự án</h3>
            
            <div className="space-y-4 text-sm">
              {/* Vai trò */}
              <div className="flex items-center gap-3 text-gray-600">
                <User size={18} className="text-gray-400 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Vai trò đảm nhiệm</span>
                  <span className="font-semibold text-gray-800">{project.role || 'Fullstack Developer'}</span>
                </div>
              </div>

              {/* Kiến trúc hệ thống */}
              <div className="flex items-center gap-3 text-gray-600">
                <Layers size={18} className="text-gray-400 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Kiến trúc hệ thống</span>
                  <span className="font-semibold text-blue-600">
                    {project.architectureName || 'Chưa xác định' }
                  </span>
                </div>
              </div>

              {/* Quy mô nhóm */}
              <div className="flex items-center gap-3 text-gray-600">
                <Users size={18} className="text-gray-400 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Quy mô nhân sự</span>
                  <span className="font-semibold text-gray-800">
                    {project.teamSize ? `${project.teamSize} thành viên` : 'Dự án cá nhân'}
                  </span>
                </div>
              </div>

              {/* Khoảng thời gian */}
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={18} className="text-gray-400 shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400">Thời gian thực hiện</span>
                  <span className="font-semibold text-gray-800">
                    {project.fromDate || 'N/A'} — {project.toDate || 'Present'}
                  </span>
                </div>
              </div>
            </div>

            {/* Khối Công nghệ */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Công nghệ cốt lõi</span>
              <div className="flex flex-wrap gap-1.5">
                {renderTechTags()}
              </div>
            </div>

            {/* Tài nguyên liên kết */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Tài nguyên mã nguồn</span>
              <div className="flex flex-col gap-2">
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors py-1"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Xem mã nguồn GitHub
                  </a>
                )}
                {project.projectLinks && (
                  <a 
                    href={project.projectLinks} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                  >
                    <ExternalLink size={15} className="text-gray-400" /> Tài liệu đặc tả (SRS)
                  </a>
                )}
                {project.demoLink && (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors pt-2 border-t border-gray-100"
                  >
                    <ExternalLink size={15} /> Khởi chạy Live Demo
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