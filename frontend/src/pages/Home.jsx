import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/common/Button';
import axiosInstance from '../api/axiosConfig';

import avatarImg from '../assets/avatar.png';
import bgImg from '../assets/rocklee-bg.png'; 

export default function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [personalDetail, setPersonalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);

  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [projectRes, profileRes] = await Promise.all([
          axiosInstance.get('/v1/public/projects'),
          axiosInstance.get('/v1/public/profile/toandev2505')
        ]);

        const top3Projects = projectRes.data.slice(0, 3);
        setLatestPosts(top3Projects);

        if (profileRes.data && profileRes.data.personalDetail) {
          setPersonalDetail(profileRes.data.personalDetail);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối API Spring Boot tại trang Home:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const currentText = heroTextRef.current;
    const currentImage = heroImageRef.current;

    if (currentText) observer.observe(currentText);
    if (currentImage) observer.observe(currentImage);

    return () => {
      if (currentText) observer.unobserve(currentText);
      if (currentImage) observer.unobserve(currentImage);
    };
  }, [loading]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/TruongLyQuocToan_SoftwareDeveloperIntern_2026.pdf'; 
    link.download = 'TruongLyQuocToan_SoftwareDeveloperIntern_2026.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSocialIconRaw = (link) => {
    if (link.includes("github.com")) {
      return (
        <svg className="w-5 h-5 hover:text-lime-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48.0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    } else if (link.includes("linkedin.com")) {
      return (
        <svg className="w-5 h-5 hover:text-lime-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-slate-100">
      <div 
        className="fixed inset-0 z-0" 
        style={{ backgroundImage: `url('${bgImg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="fixed inset-0 z-0 bg-black/70" />


      <div className="relative z-10">
        <main className="flex-grow">
          
          {/* HERO SECTION */}
          <header
            style={{
              transform: `translateY(${Math.min(scrollY * 0.4, 50)}px)`,
              opacity: Math.max(1 - scrollY / 700, 0),
            }}
            className="
              min-h-screen
              max-w-6xl
              mx-auto
              px-4
              grid
              md:grid-cols-3
              gap-8
              items-center
            "
          >
            
            {/* CỘT TRÁI */}
            <div 
              ref={heroTextRef}
              className="md:col-span-2 space-y-6 opacity-0 translate-y-12 transition-all duration-[700ms] ease-out"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <style>{`
                  @keyframes elegantGlow {
                    0%, 100% {
                      text-shadow: 0 0 4px rgba(245, 158, 11, 0.4), 0 0 12px rgba(245, 158, 11, 0.2);
                      opacity: 0.95;
                    }
                    50% {
                      text-shadow: 0 0 16px rgba(254, 240, 138, 0.8), 0 0 28px rgba(245, 158, 11, 0.5);
                      opacity: 1;
                    }
                  }
                  .premium-name {
                    animation: elegantGlow 3s ease-in-out infinite;
                  }
                `}</style>

                Hi, I'm{" "}
                <span 
                  className="premium-name inline-block bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-transparent bg-clip-text font-black tracking-wide pr-2"
                >
                  {personalDetail?.fullName || "Trương Lý Quốc Toàn"}
                </span>
                <br />
                <span className="text-green-400 font-semibold">{personalDetail?.title || "Software Engineer"}</span>
              </h1>
              <p className="text-lg text-slate-200 leading-relaxed drop-shadow-md">
                {personalDetail?.bio || "I build scalable web applications and share knowledge about system design, architecture and development."}
              </p>
              
              <div className="flex space-x-4 items-center">
                <Button variant="primary" onClick={() => navigate('/projects')}>
                  View Projects
                </Button>

                {isAdmin ? (
                  /* NÚT QUẢN LÝ DỰ ÁN: Đồng bộ thiết kế màu xanh lục bảo trong suốt, chữ trắng nét đậm cực kì dễ đọc */
                  <button 
                    onClick={() => navigate('/projects')}
                    className="px-5 py-2.5 rounded-md font-bold text-sm tracking-wide text-white bg-green-700/70 border border-green-400/50 shadow-lg backdrop-blur-md hover:bg-green-600 hover:border-green-400 transition-all duration-200 active:scale-95"
                  >
                    Quản Lý Dự Án
                  </button>
                ) : (
                  <Button variant="secondary" 
                    onClick={handleDownloadCV}
                    className="px-5 py-2.5 rounded-md font-bold text-sm tracking-wide text-white bg-green-700/70 border border-green-400/50 shadow-lg backdrop-blur-md hover:bg-green-600 hover:border-green-400 transition-all duration-200 active:scale-95"
                  >
                    Download CV
                  </Button>
                )}
              </div>

              <div className="flex space-x-4 text-green-400/80 pt-2">
                {personalDetail?.socialLinks && personalDetail.socialLinks.length > 0 ? (
                  personalDetail.socialLinks.map((link, index) => {
                    if (!link || link.trim() === '') return null;
                    return (
                      <a 
                        key={index} 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Social Link ${index + 1}`}
                        className="transform hover:scale-110 hover:text-lime-400 transition-all duration-200"
                      >
                        {renderSocialIconRaw(link)}
                      </a>
                    );
                  })
                ) : (
                  <>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 hover:scale-110 transition-all duration-200" aria-label="Github">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48.0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 hover:scale-110 transition-all duration-200" aria-label="Linkedin">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
            </div>
            
            {/* CỘT PHẢI: KHỐI ẢNH ĐẠI DIỆN TRÒN */}
            <div 
              ref={heroImageRef}
              className="flex justify-center md:justify-end opacity-0 translate-y-12 transition-all duration-[700ms] delay-200 ease-out"
            >
              <div className="w-80 h-80 rounded-full border-2 border-green-400/30 shadow-2xl overflow-hidden bg-black/40 group">
                <img 
                  src={personalDetail?.avatarLink || avatarImg} 
                  alt={personalDetail?.fullName || "Quoc Toan"} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </div>
          </header>

          {/* NAVIGATION CARDS */}
          <section
            className="
              max-w-6xl
              mx-auto
              px-4
              py-8
              grid
              md:grid-cols-3
              gap-6
              transition-all
              duration-500
            "
          >
            <div className="border border-green-500/15 bg-black/40 backdrop-blur-md p-6 rounded-lg hover:bg-black/60 hover:border-green-500/35 transition duration-300 shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-green-300">Projects</h3>
              <p className="text-sm text-slate-400 mb-4">Things I've built and worked on.</p>
              <Link to="/projects" className="text-sm font-semibold flex items-center gap-1 hover:underline text-lime-400">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="border border-green-500/15 bg-black/40 backdrop-blur-md p-6 rounded-lg hover:bg-black/60 hover:border-green-500/35 transition duration-300 shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-green-300">Blog</h3>
              <p className="text-sm text-slate-400 mb-4">Thoughts, tutorials and technical articles.</p>
              <Link to="/blog" className="text-sm font-semibold flex items-center gap-1 hover:underline text-lime-400">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="border border-green-500/15 bg-black/40 backdrop-blur-md p-6 rounded-lg hover:bg-black/60 hover:border-green-500/35 transition duration-300 shadow-lg">
              <h3 className="font-bold text-lg mb-2 text-green-300">Resume</h3>
              <p className="text-sm text-slate-400 mb-4">My experience, education and skills.</p>
              <Link to="/resume" className="text-sm font-semibold flex items-center gap-1 hover:underline text-lime-400">
                View resume <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section
            className="
              max-w-6xl
              mx-auto
              px-4
              py-12
              border-t
              border-green-500/15
              mb-12
              transition-all
              duration-700
            "
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-100">Latest Projects</h2>
              <Link to="/projects" className="text-sm font-semibold flex items-center gap-1 hover:underline text-green-400">
                View all projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {loading ? (
                [1, 2, 3].map((n) => (
                  <div key={n} className="border border-green-500/10 bg-black/30 rounded-lg overflow-hidden animate-pulse">
                    <div className="h-44 bg-black/40"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-4 bg-black/40 rounded w-1/4"></div>
                      <div className="h-6 bg-black/40 rounded w-3/4"></div>
                      <div className="h-4 bg-black/40 rounded w-full"></div>
                    </div>
                  </div>
                ))
              ) : latestPosts.length === 0 ? (
                <div className="col-span-3 text-center py-8 text-green-300/50">
                  Chưa có dự án nào được cập nhật.
                </div>
              ) : (
                latestPosts.map((project) => (
                  <article key={project.id} className="border border-green-500/10 rounded-lg overflow-hidden flex flex-col hover:shadow-2xl hover:border-green-500/25 transition duration-300 bg-black/40 backdrop-blur-md">
                    <div className="h-44 bg-black/20 border-b border-green-500/10 relative overflow-hidden">
                      <img 
                        src={project.thumbnailLink || 'https://via.placeholder.com/400x176'} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block bg-black/50 text-green-400 text-xs px-2.5 py-1 rounded border border-green-500/15 font-medium">
                          {project.role || 'Developer'}
                        </span>
                        
                        <h3 
                          className="font-bold text-lg leading-snug hover:text-lime-400 cursor-pointer line-clamp-2 text-slate-100" 
                          onClick={() => navigate(`/projects/${project.slug || project.id}`)}
                        >
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-slate-300 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.techList && project.techList.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="bg-black/40 text-lime-400 text-[11px] px-2 py-0.5 rounded border border-green-500/10 font-medium">
                            {tech}
                          </span>
                        ))}
                        {project.techList && project.techList.length > 3 && (
                          <span className="text-green-400/60 text-[11px] px-1 py-0.5">+{project.techList.length - 3}</span>
                        )}
                      </div>
                      
                      <div className="text-xs text-green-400/40 font-medium pt-2 border-t border-green-500/10">
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
    </div>
  );
}