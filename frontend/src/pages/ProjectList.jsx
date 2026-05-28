import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Eye } from 'lucide-react'; // Thêm icon Eye
import { useNavigate, Link } from 'react-router-dom'; // Import thêm Link để tối ưu chuyển trang

import axiosInstance from '../api/axiosConfig';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // 1. Lấy thông tin chứng thực từ localStorage
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  
  // Kiểm tra xem người dùng hiện tại có phải là ADMIN hay không
  const isAdmin = token && userRole === 'ADMIN';

  // 2. Gọi API lấy danh sách dự án công khai (Public)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/v1/public/projects');
        setProjects(response.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách dự án:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 3. Hàm xử lý Xóa dự án (Chỉ Admin mới thực hiện được)
  const handleDelete = async (projectId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
      try {
        await axiosInstance.delete(`/v1/admin/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProjects(projects.filter(p => p.id !== projectId));
        alert("Xóa dự án thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa dự án:", error);
        alert("Bạn không có quyền thực hiện hành động này hoặc token đã hết hạn!");
      }
    }
  };

  if (loading) return <div className="text-center py-10">Đang tải danh sách dự án...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      
      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dự Án Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Danh sách sản phẩm và hệ thống đã xây dựng.</p>
        </div>

        {/* Nếu là ADMIN thì mới hiển thị nút Thêm */}
        {isAdmin && (
          <button 
            onClick={() => navigate('/project/edit')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
          >
            <Plus size={18} /> Thêm Dự Án Mới
          </button>
        )}
      </div>

      {/* GRID DANH SÁCH CARD PROJECT */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col bg-white relative group">
            
            {/* CỤM NÚT ĐIỀU KHIỂN HOVER Ở GÓC CARD */}
            <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isAdmin ? (
                /* NẾU LÀ ADMIN: Hiện nút Chỉnh sửa và Xóa nhanh */
                <>
                  <button 
                    onClick={() => navigate(`/project/edit?id=${project.id}`)}
                    className="p-2 bg-white text-gray-700 rounded-full hover:text-blue-600 shadow-md transition"
                    title="Sửa dự án"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-white text-gray-700 rounded-full hover:text-red-600 shadow-md transition"
                    title="Xóa dự án"
                  >
                    <Trash2 size={15} />
                  </button>
                </>
              ) : (
                /* NẾU KHÔNG PHẢI ADMIN: Hiện nhanh một nút xem nhanh dạng icon mắt tròn */
                <button 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="p-2 bg-white text-gray-700 rounded-full hover:text-blue-600 shadow-md transition"
                  title="Xem chi tiết"
                >
                  <Eye size={15} />
                </button>
              )}
            </div>

            {/* Ảnh Thumbnail - Click vào ảnh cũng dẫn đi xem chi tiết */}
            <Link to={`/projects/${project.id}`} className="h-48 bg-gray-100 overflow-hidden block hover:opacity-95 transition-opacity">
              <img 
                src={project.thumbnailLink || 'https://via.placeholder.com/400x200'} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              />
            </Link>

            {/* Nội dung chi tiết */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded font-medium border border-gray-200">
                  {project.role || 'Developer'}
                </span>
                
                {/* Tiêu đề - Click vào tiêu đề để xem chi tiết */}
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1 hover:text-blue-600 transition-colors">
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{project.description}</p>
              </div>

              {/* Danh sách Công nghệ */}
              <div className="flex flex-wrap gap-1">
                {project.techList && project.techList.map((tech, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 text-[11px] px-2 py-0.5 rounded font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* THANH ĐƯỜNG DẪN LIÊN KẾT & NÚT CHI TIẾT */}
              <div className="flex items-center justify-between pt-2 border-t text-sm font-medium">
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline transition-colors">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>

                {/* NÚT XEM CHI TIẾT DÀNH CHO TẤT CẢ MỌI NGƯỜI */}
                <button 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Chi tiết →
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* HIỂN THỊ KHI TRỐNG DỮ LIỆU */}
      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">Chưa có dự án nào trong hệ thống.</div>
      )}

    </div>
  );
}