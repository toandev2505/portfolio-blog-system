import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Calendar, Edit2, Check, X } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

const ResumePage = () => {
  const username = "toandev2505"; 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('education');

  // State lưu danh sách Kiến trúc hệ thống tải động từ API giống trang ProjectForm
  const [architectures, setArchitectures] = useState([]);

  // Kiểm tra quyền ADMIN từ localStorage
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  
  // Quản lý dữ liệu form chỉnh sửa độc lập
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const initializeData = async () => {
      try {
        // 1. Tải song song thông tin Profile công khai và danh sách các Kiến trúc hệ thống
        const [profileRes, archRes] = await Promise.all([
          axiosInstance.get(`/v1/public/profile/${username}`),
          axiosInstance.get('/v1/public/architectures')
        ]);
        
        setProfile(profileRes.data);
        setArchitectures(archRes.data || []);
      } catch (err) {
        console.error('Lỗi khi tải thông tin khởi tạo hồ sơ:', err);
        setError(err.response?.data?.message || 'Không thể tải cấu hình dữ liệu hoặc hồ sơ phù hợp');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Kích hoạt chế độ chỉnh sửa cho từng bản ghi cụ thể
  const handleStartEdit = (item, type) => {
    setEditingItemId(item.id);
    
    if (type === 'education') {
      setEditFormData({
        schoolName: item.schoolName || '',
        degree: item.degree || '',
        major: item.major || '',
        fromDate: item.fromDate || '',
        toDate: item.toDate || ''
      });
    } else if (type === 'experience') {
      setEditFormData({
        position: item.position || '',
        companyName: item.companyName || '',
        fromDate: item.fromDate || '',
        toDate: item.toDate || '',
        // Map theo Id của kiến trúc hiện tại để khớp với cơ chế Select Option
        architectureId: item.architecture?.id ? String(item.architecture.id) : '',
        jobDescription: item.jobDescription || '',
        technologies: item.technologies || ''
      });
    } else if (type === 'skills') {
      setEditFormData({ skillName: item.skillName || '', skillCategory: item.skillCategory || '' });
    } else if (type === 'achievements') {
      setEditFormData({ title: item.title || '', issueDate: item.issueDate || '', description: item.description || '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- THỰC HIỆN GỌI API ĐỂ LƯU THAY ĐỔI VÀO DATABASE ---
  const handleSaveEdit = async (id, type) => {
    try {
      // 1. Xác định đúng endpoint theo cấu trúc: /v1/admin/profile/{tab_name}
      // Bản đồ map tab name tương ứng với URL của Spring Boot Controller
      const typeMapping = {
        education: 'educations',
        experience: 'work-experiences',
        skills: 'skills',
        achievements: 'achievements'
      };
      
      const subPath = typeMapping[type];
      
      // 2. Truyền id qua Request Query Parameter (?id=...) theo đúng định nghĩa @RequestParam
      // Lấy thêm profile.id hoặc profile.userId (tùy thuộc vào field Backend trả về trong đối tượng profile)
      const currentUserId = profile.id || profile.userId || 1; 
      const endpoint = `/v1/admin/profile/${subPath}?id=${id}&userId=${currentUserId}`;

      // 3. Chuẩn hóa dữ liệu Request Body (Payload) khớp với DTO
      let payload = { ...editFormData };
      if (type === 'experience') {
        payload = {
          ...editFormData,
          // Ép kiểu ID kiến trúc hệ thống về số nguyên giống trang ProjectForm
          architectureId: editFormData.architectureId ? parseInt(editFormData.architectureId, 10) : null
        };
        // Xóa trường tạm tránh thừa dữ liệu DTO nếu cần
        delete payload.architectureName; 
      }

      // 4. Thực hiện gọi API PUT và đính kèm Token trong Headers giống hệt ProjectForm
      const response = await axiosInstance.put(endpoint, payload, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      // 5. Đồng bộ lại dữ liệu lên giao diện (State Frontend) khi Backend trả về 200 OK
      if (response.status === 200 || response.status === 204) {
        if (type === 'education') {
          const updated = profile.educations.map(item => item.id === id ? { ...item, ...editFormData } : item);
          setProfile({ ...profile, educations: updated });
        } else if (type === 'experience') {
          // Tìm thông tin đối tượng kiến trúc vừa chọn từ danh sách động để render nhãn hiển thị
          const selectedArch = architectures.find(a => a.id === parseInt(editFormData.architectureId, 10));
          const updated = profile.workExperiences.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  ...payload, 
                  architecture: selectedArch ? { id: selectedArch.id, name: selectedArch.name || selectedArch.title } : null 
                } 
              : item
          );
          setProfile({ ...profile, workExperiences: updated });
        } else if (type === 'skills') {
          const updated = profile.skills.map(item => item.id === id ? { ...item, ...editFormData } : item);
          setProfile({ ...profile, skills: updated });
        } else if (type === 'achievements') {
          const updated = profile.achievements.map(item => item.id === id ? { ...item, ...editFormData } : item);
          setProfile({ ...profile, achievements: updated });
        }
        
        setEditingItemId(null);
        // Hiển thị thông báo thành công từ Map.of("message", ...) của Backend trả về
        alert(response.data?.message || "Đã cập nhật thay đổi thành công!");
      }
    } catch (err) {
      console.error("Lỗi khi lưu dữ liệu qua API:", err);
      // Hiển thị chi tiết thông báo lỗi từ Map.of("error", ...) nếu có
      alert(`Không thể lưu dữ liệu: ${err.response?.data?.error || err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
        <span className="ml-2 text-slate-600 font-medium text-sm">Loading Resume...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 border border-slate-200 m-4 rounded">
        <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
        <h2 className="text-xl font-bold text-slate-800">Error</h2>
        <p className="text-slate-500 text-sm">{error || 'No data available'}</p>
      </div>
    );
  }

  const { educations, workExperiences, skills, achievements } = profile;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* BANNER ĐIỀU KHIỂN MODE ADMIN */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume</h1>
            <p className="text-xs text-slate-500 mt-0.5">My qualifications, professional experience and tech stacks.</p>
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200 font-medium">Admin Area</span>
              <button 
                onClick={() => { setIsEditingMode(!isEditingMode); handleCancelEdit(); }}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition shadow-sm ${isEditingMode ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              >
                {isEditingMode ? <><X size={13}/> Thoát Chế Độ Sửa</> : <><Edit2 size={13}/> Bật Chế Độ Chỉnh Sửa</>}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start border-t border-slate-200 pt-6">
          
          {/* MENU TABS BÊN TRÁI */}
          <div className="md:col-span-1 space-y-1">
            {['education', 'experience', 'skills', 'achievements'].map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); handleCancelEdit(); }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-all duration-150 capitalize ${activeTab === tab ? 'bg-slate-100 text-slate-900 font-semibold border-l-2 border-slate-800 pl-2.5' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {tab === 'experience' ? 'Work Experience' : tab}
              </button>
            ))}
          </div>

          {/* KHU VỰC HIỂN THỊ NỘI DUNG CHI TIẾT */}
          <div className="md:col-span-3 pl-0 md:pl-6 border-l-0 md:border-l border-slate-100 min-h-[400px]">
            
            {/* TAB: EDUCATION */}
            <div className={activeTab === 'education' ? 'block' : 'hidden'}>
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Education</h2>
              </div>
              
              {educations && educations.length > 0 && (
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="relative border-b border-dashed border-slate-100 pb-4 last:border-0">
                      {editingItemId === edu.id ? (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 mt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">School Name</label>
                              <input type="text" name="schoolName" value={editFormData.schoolName || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Degree</label>
                              <input type="text" name="degree" value={editFormData.degree || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Major</label>
                              <input type="text" name="major" value={editFormData.major || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">From Date</label>
                              <input type="text" name="fromDate" value={editFormData.fromDate || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">To Date</label>
                              <input type="text" name="toDate" value={editFormData.toDate || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-white border border-slate-300 text-slate-600 px-2.5 py-1 rounded hover:bg-slate-50">Cancel</button>
                            <button onClick={() => handleSaveEdit(edu.id, 'education')} className="text-[11px] font-semibold bg-blue-600 text-white px-2.5 py-1 rounded hover:bg-blue-700">Save</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 flex items-center gap-1 bg-white pl-2">
                              <button onClick={() => handleStartEdit(edu, 'education')} className="p-1 text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-200 rounded"><Edit2 size={13} /></button>
                            </div>
                          )}
                          <div className="flex justify-between items-start text-sm pr-16">
                            <h3 className="font-bold text-slate-900">{edu.schoolName}</h3>
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" /> {edu.fromDate} - {edu.toDate}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{edu.degree} in {edu.major}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TAB: WORK EXPERIENCE */}
            <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Work Experience</h2>
              </div>
              
              {workExperiences && workExperiences.length > 0 && (
                <div className="space-y-6">
                  {workExperiences.map((work) => (
                    <div key={work.id} className="relative border-b border-dashed border-slate-100 pb-4 last:border-0">
                      {editingItemId === work.id ? (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 mt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Position</label>
                              <input type="text" name="position" value={editFormData.position || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Company</label>
                              <input type="text" name="companyName" value={editFormData.companyName || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">From Date</label>
                              <input type="text" name="fromDate" value={editFormData.fromDate || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">To Date</label>
                              <input type="text" name="toDate" value={editFormData.toDate || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            
                            {/* ĐÃ SỬA: Thay hộp chọn cố định thành Dropdown gọi API động từ Database giống ProjectForm */}
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Architecture *</label>
                              <select 
                                name="architectureId" 
                                value={editFormData.architectureId || ''} 
                                onChange={handleInputChange} 
                                className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white focus:outline-none focus:border-slate-800"
                              >
                                <option value="">-- Chọn kiến trúc hệ thống --</option>
                                {architectures.map(arch => (
                                  <option key={arch.id} value={arch.id}>
                                    {arch.name || arch.title || `ID: ${arch.id}`}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Job Description</label>
                              <textarea name="jobDescription" rows={4} value={editFormData.jobDescription || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white resize-y" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Core Technologies</label>
                              <input type="text" name="technologies" value={editFormData.technologies || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-white border border-slate-300 text-slate-600 px-2.5 py-1 rounded hover:bg-slate-50">Cancel</button>
                            <button onClick={() => handleSaveEdit(work.id, 'experience')} className="text-[11px] font-semibold bg-blue-600 text-white px-2.5 py-1 rounded hover:bg-blue-700">Save</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 flex items-center gap-1 bg-white pl-2">
                              <button onClick={() => handleStartEdit(work, 'experience')} className="p-1 text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-200 rounded"><Edit2 size={13} /></button>
                            </div>
                          )}
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between items-start pr-16">
                              <div>
                                <h3 className="font-bold text-slate-900">{work.position}</h3>
                                <p className="text-xs text-slate-500 font-medium">{work.companyName}</p>
                              </div>
                              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" /> {work.fromDate} - {work.toDate}</span>
                            </div>
                            
                            {/* Hiển thị tên nhãn Kiến trúc hệ thống thông qua liên kết đối tượng của Backend */}
                            {work.architectureName && (
                              <span className="inline-block text-[10px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">{work.architectureName}</span>
                            )}
                            {work.jobDescription && <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line pt-1">{work.jobDescription}</p>}
                            {work.technologies && <p className="text-[11px] text-slate-400 pt-0.5"><span className="font-semibold text-slate-500">Technologies:</span> {work.technologies}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TAB: SKILLS */}
            <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Skills</h2>
              </div>
              {skills && skills.length > 0 && (
                <div className="space-y-4">
                  {Object.entries(skills.reduce((acc, current) => { (acc[current.skillCategory] = acc[current.skillCategory] || []).push(current); return acc; }, {})).map(([category, items]) => (
                    <div key={category} className="text-sm">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <div key={skill.id} className="inline-flex items-center gap-1">
                            {editingItemId === skill.id ? (
                              <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded px-1 py-0.5">
                                <input type="text" name="skillName" value={editFormData.skillName || ''} onChange={handleInputChange} className="text-xs w-20 px-1 py-0.5 focus:outline-none bg-white border border-slate-200 rounded" />
                                <button onClick={() => handleSaveEdit(skill.id, 'skills')} className="text-green-600 p-0.5 hover:bg-white rounded"><Check size={11}/></button>
                                <button onClick={handleCancelEdit} className="text-slate-400 p-0.5 hover:bg-white rounded"><X size={11}/></button>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 text-xs rounded border border-slate-200 font-medium">
                                {skill.skillName}
                                {isAdmin && isEditingMode && (
                                  <button onClick={() => handleStartEdit(skill, 'skills')} className="text-slate-400 hover:text-blue-600 border-l border-slate-200 pl-1 ml-0.5"><Edit2 size={10} /></button>
                                )}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TAB: ACHIEVEMENTS */}
            <div className={activeTab === 'achievements' ? 'block' : 'hidden'}>
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Achievements</h2>
              </div>
              {achievements && achievements.length > 0 && (
                <div className="space-y-4">
                  {achievements.map((ach) => (
                    <div key={ach.id} className="relative border-b border-dashed border-slate-100 pb-3 last:border-0">
                      {editingItemId === ach.id ? (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 mt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Award Title</label>
                              <input type="text" name="title" value={editFormData.title || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Issue Date</label>
                              <input type="text" name="issueDate" value={editFormData.issueDate || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Description</label>
                              <textarea name="description" rows={3} value={editFormData.description || ''} onChange={handleInputChange} className="w-full text-xs border border-slate-300 rounded px-2.5 py-2 bg-white resize-y" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-white border border-slate-300 text-slate-600 px-2.5 py-1 rounded hover:bg-slate-50">Cancel</button>
                            <button onClick={() => handleSaveEdit(ach.id, 'achievements')} className="text-[11px] font-semibold bg-blue-600 text-white px-2.5 py-1 rounded hover:bg-blue-700">Save</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 flex items-center gap-1 bg-white pl-2">
                              <button onClick={() => handleStartEdit(ach, 'achievements')} className="p-1 text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-200 rounded"><Edit2 size={13} /></button>
                            </div>
                          )}
                          <div className="text-sm space-y-0.5 pr-16">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-slate-900">{ach.title}</h3>
                              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" /> {ach.issueDate}</span>
                            </div>
                            {ach.description && <p className="text-xs text-slate-500 leading-relaxed pt-0.5">{ach.description}</p>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumePage;