import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, MapPin, Mail, Globe, Loader2, AlertCircle } from 'lucide-react';

const ProfileCardPage = () => {
  const { username } = useParams();
  const [personalDetail, setPersonalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/public/profile/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Không tìm thấy hồ sơ người dùng tương ứng');
        return res.json();
      })
      .then((data) => {
        setPersonalDetail(data.personalDetail);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-9 h-9 animate-spin text-slate-500" />
        <span className="ml-3 text-slate-500 text-sm font-medium">Loading profile...</span>
      </div>
    );
  }

  if (error || !personalDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <AlertCircle className="w-14 h-14 text-red-500 mb-2" />
        <h2 className="text-xl font-bold text-slate-800">Profile Not Found</h2>
        <p className="text-slate-500 text-sm text-center mt-1">{error || 'Thông tin chi tiết cá nhân trống'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 shadow-md rounded-2xl p-8 md:p-10 space-y-6 transition-all duration-300">
        
        {/* Khu vực Top Profile */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          
          {personalDetail.avatarLink && (
            <img 
              src={personalDetail.avatarLink} 
              alt={personalDetail.fullName} 
              className="w-32 h-32 bg-slate-100 rounded-full object-cover border-2 border-slate-200 shadow-sm shrink-0"
            />
          )}
          
          {/* Thông tin định danh */}
          <div className="space-y-2.5 flex-1 w-full">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personalDetail.fullName}
              </h1>
              <p className="text-base font-semibold text-blue-600 mt-0.5">
                {personalDetail.title}
              </p>
            </div>
            
            {personalDetail.bio && (
              <p className="text-sm text-slate-500 italic max-w-xl mx-auto md:mx-0 leading-relaxed">
                "{personalDetail.bio}"
              </p>
            )}
            
            {/* Lưới liên hệ */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 border-t border-slate-100 mt-4">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate font-medium text-slate-700">toandev2505@gmail.com</span>
              </div>
              
              {personalDetail.phone && (
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">{personalDetail.phone}</span>
                </div>
              )}
              
              {personalDetail.address && (
                <div className="flex items-center justify-center md:justify-start gap-2.5 col-span-1 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-700 font-medium truncate">{personalDetail.address}</span>
                </div>
              )}
              
              {/* ĐÁ SỬA: Chạy vòng lặp render danh sách mảng socialLinks mới từ Backend */}
              {personalDetail.socialLinks && personalDetail.socialLinks.length > 0 && (
                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2 pt-0.5">
                  {personalDetail.socialLinks.map((link, index) => {
                    if (!link || link.trim() === '') return null;

                    // Nhận diện nhanh nhãn để giao diện trực quan hơn
                    let linkLabel = "Website / Portfolio";
                    if (link.includes("github.com")) linkLabel = "GitHub";
                    else if (link.includes("linkedin.com")) linkLabel = "LinkedIn";
                    else if (link.includes("facebook.com")) linkLabel = "Facebook";

                    return (
                      <div key={index} className="flex items-center justify-center md:justify-start gap-2.5">
                        <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                        <a 
                          href={link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-blue-600 hover:text-blue-700 hover:underline font-semibold truncate transition-colors text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block max-w-full"
                        >
                          <span className="text-slate-400 font-normal mr-1">[{linkLabel}]</span>
                          {link}
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Khối Giới thiệu chi tiết (About Me) */}
        {personalDetail.aboutMe && (
          <div className="pt-5 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About Me
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 px-4 py-3.5 rounded-xl border border-slate-100 font-normal">
              {personalDetail.aboutMe}
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ProfileCardPage;