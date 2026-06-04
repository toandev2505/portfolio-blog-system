import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkExternalLinks from 'remark-external-links';

// Import các components common dùng chung
import Button from '../components/common/Button';

// Import instance Axios đã cấu hình chung
import axiosInstance from '../api/axiosConfig';

import avatarImg from '../assets/avatar.png';
import bgImg from '../assets/rocklee-bg.png'; // Sử dụng chung background với trang Home

export default function About() {
  const [personalDetail, setPersonalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Khởi tạo các Refs để theo dõi hiệu ứng cuộn cho từng phần tử
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axiosInstance.get('/v1/public/profile/toandev2505');
        if (response.data && response.data.personalDetail) {
          setPersonalDetail(response.data.personalDetail);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối API tại trang About:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Cấu hình Intersection Observer tạo hiệu ứng cuộn mượt mà
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
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

    const currentLeftCol = leftColRef.current;
    const currentRightCol = rightColRef.current;

    if (currentLeftCol) observer.observe(currentLeftCol);
    if (currentRightCol) observer.observe(currentRightCol);

    return () => {
      if (currentLeftCol) observer.unobserve(currentLeftCol);
      if (currentRightCol) observer.unobserve(currentRightCol);
    };
  }, [loading]);

  // --- HÀM RENDERING ICON SVG ĐỒNG BỘ MÀU HOVER LIME-400 CỦA HOME ---
  const renderSocialIconRaw = (link) => {
    const baseClass = "w-5 h-5 hover:text-lime-400 transition-colors duration-200";
    if (link.includes("github.com")) {
      return (
        <svg className={baseClass} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48.0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    } else if (link.includes("linkedin.com")) {
      return (
        <svg className={baseClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    }
    return (
      <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('${bgImg}')` }}
      >
        <div className="w-full min-h-screen bg-black/65 backdrop-blur-[1px] flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 mt-4 text-green-400 text-sm font-medium tracking-wide">Loading identity...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col min-h-screen text-slate-100 font-sans overflow-x-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('${bgImg}')` }}
    >
      <div className="flex-grow bg-black/65 backdrop-blur-[1px] w-full">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          
          {/* LAYOUT CHÍNH: Grid chia cột giống như thiết kế gốc nhưng sử dụng khối tối xám slate trong suốt */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            {/* CỘT TRÁI: PROFILE IMAGE & CONTACT LIST */}
            <div 
              ref={leftColRef}
              className="space-y-6 flex flex-col items-center md:items-stretch opacity-0 translate-y-12 transition-all duration-[700ms] ease-out"
            >
              {/* Khung chứa Avatar đồng bộ viền sáng nhẹ xanh lá của Home */}
              <div className="w-full max-w-[280px] mx-auto md:max-w-none aspect-square rounded-full md:rounded-2xl border-2 border-green-400/30 shadow-2xl overflow-hidden bg-slate-900/40 group">
                <img 
                  src={personalDetail?.avatarLink || avatarImg} 
                  alt={personalDetail?.fullName || "Quoc Toan"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>

              {/* Box liên hệ đồng bộ dạng Card trong suốt (bg-slate-900/50 border-green-500/20) */}
              <div className="w-full p-6 border border-green-500/20 bg-slate-900/50 backdrop-blur-md rounded-lg shadow-xl space-y-4 text-sm text-slate-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 hidden md:block">
                  Contact Coordinates
                </h3>
                
                <div className="flex items-center gap-3 justify-center md:justify-start group">
                  <Mail className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="font-medium text-slate-200 truncate select-all group-hover:text-lime-400 transition-colors">
                    toandev2505@gmail.com
                  </span>
                </div>
                
                {personalDetail?.phone && (
                  <div className="flex items-center gap-3 justify-center md:justify-start group">
                    <Phone className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="font-medium text-slate-200 group-hover:text-lime-400 transition-colors">
                      {personalDetail.phone}
                    </span>
                  </div>
                )}
                
                {personalDetail?.address && (
                  <div className="flex items-center gap-3 justify-center md:justify-start group">
                    <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="font-medium text-slate-200 line-clamp-1 group-hover:text-lime-400 transition-colors">
                      {personalDetail.address}
                    </span>
                  </div>
                )}

                {/* Hàng nút Social Links mạng xã hội */}
                <div className="flex justify-center md:justify-start gap-4 pt-4 border-t border-green-500/15 text-green-400/80">
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
                        {renderSocialIconRaw("github.com")}
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 hover:scale-110 transition-all duration-200" aria-label="Linkedin">
                        {renderSocialIconRaw("linkedin.com")}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT TIỂU SỬ & NỘI DUNG ABOUT ME */}
            <div 
              ref={rightColRef}
              className="md:col-span-2 space-y-6 text-left opacity-0 translate-y-12 transition-all duration-[700ms] delay-200 ease-out"
            >
              {/* Giữ hiệu ứng Keyframes Glow chữ hoàng kim sang xịn của Home */}
              <div className="space-y-2 text-center md:text-left">
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
                  .premium-name-about {
                    animation: elegantGlow 3s ease-in-out infinite;
                  }
                `}</style>
                
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
                  About Me
                </h1>
                <p className="text-md md:text-lg font-medium text-slate-200">
                  Hi, I'm{" "}
                  <span className="premium-name-about inline-block bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-transparent bg-clip-text font-black tracking-wide pr-2">
                    {personalDetail?.fullName || "Trương Lý Quốc Toàn"}
                  </span>
                  <br className="md:hidden" />
                  <span className="text-green-400 font-semibold md:ml-1 block md:inline mt-1 md:mt-0">
                    {personalDetail?.title || "Software Engineer"}
                  </span>
                </p>
              </div>

              {/* Khối trích dẫn ngắn (Bio) - Nhấn bằng đường viền xanh lá mờ */}
              {personalDetail?.bio && (
                <div className="relative pl-4 py-2 border-l-2 border-green-500/30 bg-slate-900/30 rounded-r-lg pr-4 italic text-slate-300 leading-relaxed text-[15px] drop-shadow-sm">
                  "{personalDetail.bio}"
                </div>
              )}

              {/* Khối bọc HTML an toàn, tự định hình class của Markdown lồng nhau */}
              <div className="text-slate-300 text-[15px] leading-relaxed pt-2 font-normal drop-shadow-md">
                {personalDetail?.aboutMe ? (
                  <div className="prose max-w-none text-slate-300 
                    [&_p]:mb-4 [&_p]:leading-relaxed
                    [&_a]:text-lime-400 [&_a]:font-semibold hover:[&_a]:underline
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                    [&_strong]:text-green-300 [&_strong]:font-semibold">
                    <ReactMarkdown remarkPlugins={[remarkExternalLinks]}>
                      {personalDetail.aboutMe}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p>
                    Welcome to my profile! I am a passionate developer focusing on building high-performance 
                    backend systems and dynamic web applications. I love solving complex structural problems, 
                    optimizing code, and creating seamless workflows.
                  </p>
                )}
              </div>

              {/* Nút hành động (CTA) sử dụng Component Common Button của bạn */}
              <div className="pt-6 flex flex-wrap justify-center md:justify-start gap-4">
                <Button variant="primary" onClick={() => navigate('/resume')}>
                  View My Resume <ArrowRight size={15} className="inline ml-1.5" />
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/projects')}
                  className="bg-slate-950/80 border border-green-500/50 text-white hover:bg-slate-800 px-6 py-2 rounded-lg backdrop-blur-sm transition-all"
                >
                  Browse Projects
                </Button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}