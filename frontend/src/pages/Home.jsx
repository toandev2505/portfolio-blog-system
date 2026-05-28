import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Bổ sung thêm useNavigate ở đây

// Import các components common dùng chung
import Button from '../components/common/Button';

// Import instance Axios đã cấu hình chung
import axiosInstance from '../api/axiosConfig';

import avatarImg from '../assets/avatar.png';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Khởi tạo hook điều hướng mượt mà của React Router
  const navigate = useNavigate();

  // 3. Đọc thông tin đăng nhập từ localStorage để xử lý giao diện
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  // Gọi API khi trang Home được load lên lần đầu
  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const response = await axiosInstance.get('/v1/public/projects');
        const top3Projects = response.data.slice(0, 3);
        setLatestPosts(top3Projects);
      } catch (error) {
        console.error("Lỗi khi kết nối API Spring Boot:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">

      {/* CHỨA NỘI DUNG CHÍNH CỦA TRANG HOME */}
      <main className="flex-grow">
        
        {/* 2. HERO SECTION */}
        <header className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hi, I'm Quoc Toan <br />
              <span className="text-gray-500">Software Engineer</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              I build scalable web applications and share knowledge about system design, architecture and development.
            </p>
            
            <div className="flex space-x-4">
              {/* Đã sửa: Thay window.location.href bằng điều hướng navigate của React */}
              <Button variant="primary" onClick={() => navigate('/projects')}>
                View Projects
              </Button>

              {/* Tối ưu UX: Nếu là ADMIN thì đổi nút download thành nút vào thẳng trang Quản trị */}
              {isAdmin ? (
                <Button variant="secondary" onClick={() => navigate('/projects')}>
                  Quản Lý Dự Án
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => console.log('Download CV')}>
                  Download CV
                </Button>
              )}
            </div>

            <div className="flex space-x-4 text-gray-500 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Github">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48.0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Linkedin">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <div className="w-80 h-80 rounded-full border border-gray-200 shadow-md overflow-hidden bg-gray-50">
              <img 
                src={avatarImg} 
                alt="Quoc Toan" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
              />
            </div>
          </div>
        </header>

        {/* 3. NAVIGATION CARDS */}
        <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Projects</h3>
            <p className="text-sm text-gray-600 mb-4">Things I've built and worked on.</p>
            <Link to="/projects" className="text-sm font-semibold flex items-center gap-1 hover:underline text-blue-600">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Blog</h3>
            <p className="text-sm text-gray-600 mb-4">Thoughts, tutorials and technical articles.</p>
            <Link to="/blog" className="text-sm font-semibold flex items-center gap-1 hover:underline text-blue-600">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">Resume</h3>
            <p className="text-sm text-gray-600 mb-4">My experience, education and skills.</p>
            <Link to="/resume" className="text-sm font-semibold flex items-center gap-1 hover:underline text-blue-600">
              View resume <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* 4. LATEST PROJECTS SECTION */}
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Projects</h2>
            <Link to="/projects" className="text-sm font-semibold flex items-center gap-1 hover:underline text-gray-600 hover:text-black">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))
            ) : latestPosts.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                Chưa có dự án nào được cập nhật.
              </div>
            ) : (
              latestPosts.map((project) => (
                <article key={project.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition bg-white">
                  <div className="h-44 bg-gray-50 border-b border-gray-200 relative overflow-hidden">
                    <img 
                      src={project.thumbnailLink || 'https://via.placeholder.com/400x176'} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded border border-gray-200 font-medium">
                        {project.role || 'Developer'}
                      </span>
                      
                      {/* Đã sửa: Thay window.location.href tại đây sang navigate */}
                      <h3 
                        className="font-bold text-lg leading-snug hover:text-blue-600 cursor-pointer line-clamp-2" 
                        onClick={() => navigate(`/projects/${project.slug || project.id}`)}
                      >
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.techList && project.techList.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-600 text-[11px] px-2 py-0.5 rounded font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.techList && project.techList.length > 3 && (
                        <span className="text-gray-400 text-[11px] px-1 py-0.5">+{project.techList.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">
                      {project.fromDate ? new Date(project.fromDate).toLocaleDateString('vi-VN', {year: 'numeric', month: 'long'}) : 'Năm 2026'}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

      </main>

    </div>
  );
}