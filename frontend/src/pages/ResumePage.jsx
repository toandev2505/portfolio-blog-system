import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Calendar, Edit2, Check, X, Briefcase, GraduationCap, Award, Cpu } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

const ResumePage = () => {
  const username = "toandev2505"; 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('education');

  // Dynamic system architecture list pulled from database
  const [architectures, setArchitectures] = useState([]);

  // Admin authorization checks
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  
  // Isolated editing form state
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Parallel data loading for optimized performance
        const [profileRes, archRes] = await Promise.all([
          axiosInstance.get(`/v1/public/profile/${username}`),
          axiosInstance.get('/v1/public/architectures')
        ]);
        
        setProfile(profileRes.data);
        setArchitectures(archRes.data || []);
      } catch (err) {
        console.error('Error initializing profile configurations:', err);
        setError(err.response?.data?.message || 'Unable to fetch dynamic configurations or system profiles.');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Trigger setup values for specific row data editing
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

  // Persist modifications via secure Admin API endpoints
  const handleSaveEdit = async (id, type) => {
    try {
      const typeMapping = {
        education: 'educations',
        experience: 'work-experiences',
        skills: 'skills',
        achievements: 'achievements'
      };
      
      const subPath = typeMapping[type];
      const currentUserId = profile.id || profile.userId || 1; 
      const endpoint = `/v1/admin/profile/${subPath}?id=${id}&userId=${currentUserId}`;

      let payload = { ...editFormData };
      if (type === 'experience') {
        payload = {
          ...editFormData,
          architectureId: editFormData.architectureId ? parseInt(editFormData.architectureId, 10) : null
        };
        delete payload.architectureName; 
      }

      const response = await axiosInstance.put(endpoint, payload, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.status === 200 || response.status === 204) {
        if (type === 'education') {
          const updated = profile.educations.map(item => item.id === id ? { ...item, ...editFormData } : item);
          setProfile({ ...profile, educations: updated });
        } else if (type === 'experience') {
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
        alert(response.data?.message || "Profile data synchronized successfully!");
      }
    } catch (err) {
      console.error("Error committing database transaction:", err);
      alert(`Transaction aborted: ${err.response?.data?.error || err.response?.data?.message || err.message}`);
    }
  };

  const inputStyle = "w-full text-xs border border-slate-800 rounded-lg px-3 py-2 bg-slate-950 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-green-500/20 focus:border-green-400 outline-none transition-all";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-medium">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          <span>Loading Interactive Resume...</span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200 px-4">
        <div className="bg-slate-900/50 border border-red-500/20 p-8 rounded-2xl max-w-md text-center space-y-3 shadow-2xl">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Initialization Error</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{error || 'No matching database profile discovered.'}</p>
        </div>
      </div>
    );
  }

  const { educations, workExperiences, skills, achievements } = profile;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* CONTROL AND OPERATION BANNER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-green-500/15 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">
              Professional Resume
            </h1>
            <p className="text-sm text-slate-400 mt-1">My qualifications, work experiences, and core technical proficiencies.</p>
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs bg-green-500/5 text-green-400 px-2.5 py-1 rounded border border-green-500/10 font-mono tracking-wide">Admin Core</span>
              <button 
                onClick={() => { setIsEditingMode(!isEditingMode); handleCancelEdit(); }}
                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition shadow-md ${isEditingMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'}`}
              >
                {isEditingMode ? <><X size={14}/> Exit Live Edit</> : <><Edit2 size={14}/> Enable Live Edit</>}
              </button>
            </div>
          )}
        </div>

        {/* WORKSPACE SIDEBAR LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* TAB SEGMENTATION BUTTONS */}
          <div className="md:col-span-1 space-y-1.5 bg-slate-900/20 p-2 rounded-xl border border-slate-900">
            {[
              { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
              { id: 'experience', label: 'Work Experience', icon: <Briefcase size={16} /> },
              { id: 'skills', label: 'Core Skills', icon: <Cpu size={16} /> },
              { id: 'achievements', label: 'Achievements', icon: <Award size={16} /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); handleCancelEdit(); }}
                className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === tab.id ? 'bg-slate-900 text-green-400 font-semibold border border-slate-800 shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* DYNAMIC METADATA ROUTING ZONE */}
          <div className="md:col-span-3 bg-slate-900/40 backdrop-blur-md border border-slate-900 rounded-2xl p-6 sm:p-8 min-h-[450px]">
            
            {/* INTERFACE PANEL: EDUCATION */}
            <div className={activeTab === 'education' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <GraduationCap className="text-green-500" size={20} /> Academic History
              </h2>
              
              {educations && educations.length > 0 && (
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <div key={edu.id} className="relative border-b border-slate-800/60 pb-6 last:border-0 last:pb-0 group">
                      {editingItemId === edu.id ? (
                        <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">School Name</label>
                              <input type="text" name="schoolName" value={editFormData.schoolName || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Degree Type</label>
                              <input type="text" name="degree" value={editFormData.degree || ''} onChange={handleInputChange} className={inputStyle} placeholder="e.g., Engineering Degree" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Major / Specialization</label>
                              <input type="text" name="major" value={editFormData.major || ''} onChange={handleInputChange} className={inputStyle} placeholder="e.g., Software Engineering" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">From Date</label>
                              <input type="text" name="fromDate" value={editFormData.fromDate || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">To Date</label>
                              <input type="text" name="toDate" value={editFormData.toDate || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-800 transition">Cancel</button>
                            <button onClick={() => handleSaveEdit(edu.id, 'education')} className="text-[11px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-md hover:bg-green-500/20 transition">Save Changes</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 z-10">
                              <button onClick={() => handleStartEdit(edu, 'education')} className="p-1.5 bg-slate-950 text-slate-400 hover:text-green-400 border border-slate-800 rounded-lg shadow-sm transition"><Edit2 size={12} /></button>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-1 text-sm pr-10">
                            <h3 className="font-bold text-slate-100 text-base tracking-tight">{edu.schoolName}</h3>
                            <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 shrink-0 bg-slate-950/60 px-2 py-0.5 border border-slate-900 rounded"><Calendar className="w-3 h-3 text-green-500" /> {edu.fromDate} - {edu.toDate}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5 font-medium">
                            <span className="text-green-400 font-mono">{edu.degree}</span> in {edu.major}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INTERFACE PANEL: WORK EXPERIENCE */}
            <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <Briefcase className="text-green-500" size={20} /> Professional Experience
              </h2>
              
              {workExperiences && workExperiences.length > 0 && (
                <div className="space-y-8">
                  {workExperiences.map((work) => (
                    <div key={work.id} className="relative border-b border-slate-800/60 pb-6 last:border-0 last:pb-0 group">
                      {editingItemId === work.id ? (
                        <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Job Position</label>
                              <input type="text" name="position" value={editFormData.position || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Company / Organization</label>
                              <input type="text" name="companyName" value={editFormData.companyName || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">From Date</label>
                              <input type="text" name="fromDate" value={editFormData.fromDate || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">To Date</label>
                              <input type="text" name="toDate" value={editFormData.toDate || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Linked System Architecture *</label>
                              <select 
                                name="architectureId" 
                                value={editFormData.architectureId || ''} 
                                onChange={handleInputChange} 
                                className={`${inputStyle} bg-slate-950`}
                              >
                                <option value="" className="text-slate-600">-- Select Core Architecture Model --</option>
                                {architectures.map(arch => (
                                  <option key={arch.id} value={arch.id} className="bg-slate-900 text-slate-100">
                                    {arch.name || arch.title || `ID: ${arch.id}`}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Core Job Description & Responsibilities</label>
                              <textarea name="jobDescription" rows={4} value={editFormData.jobDescription || ''} onChange={handleInputChange} className={`${inputStyle} resize-y`} />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Core Technologies Applied</label>
                              <input type="text" name="technologies" value={editFormData.technologies || ''} onChange={handleInputChange} className={inputStyle} placeholder="e.g., Spring Boot, Docker, PostgreSQL" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-800 transition">Cancel</button>
                            <button onClick={() => handleSaveEdit(work.id, 'experience')} className="text-[11px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-md hover:bg-green-500/20 transition">Save Changes</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 z-10">
                              <button onClick={() => handleStartEdit(work, 'experience')} className="p-1.5 bg-slate-950 text-slate-400 hover:text-green-400 border border-slate-800 rounded-lg shadow-sm transition"><Edit2 size={12} /></button>
                            </div>
                          )}
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-1 pr-10">
                              <div>
                                <h3 className="font-bold text-slate-100 text-lg tracking-tight">{work.position}</h3>
                                <p className="text-sm font-semibold text-slate-400 mt-0.5">{work.companyName}</p>
                              </div>
                              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 shrink-0 bg-slate-950/60 px-2 py-0.5 border border-slate-900 rounded"><Calendar className="w-3 h-3 text-green-500" /> {work.fromDate} - {work.toDate}</span>
                            </div>
                            
                            {work.architectureName && (
                              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 bg-green-500/5 text-green-400 rounded border border-green-500/10 tracking-wide">
                                {work.architectureName}
                              </span>
                            )}
                            
                            {work.jobDescription && (
                              <p className="text-slate-400 text-xs leading-relaxed whitespace-pre-line pt-2 border-t border-slate-900/60 font-normal">
                                {work.jobDescription}
                              </p>
                            )}
                            
                            {work.technologies && (
                              <p className="text-[11px] text-slate-500 pt-1 font-mono">
                                <span className="font-semibold text-slate-400">Stack:</span> {work.technologies}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INTERFACE PANEL: SKILLS */}
            <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <Cpu className="text-green-500" size={20} /> Technical Proficiencies
              </h2>
              {skills && skills.length > 0 && (
                <div className="space-y-6">
                  {Object.entries(skills.reduce((acc, current) => { (acc[current.skillCategory] = acc[current.skillCategory] || []).push(current); return acc; }, {})).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">{category}</h3>
                      <div className="flex flex-wrap gap-2.5">
                        {items.map((skill) => (
                          <div key={skill.id} className="inline-flex items-center">
                            {editingItemId === skill.id ? (
                              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 shadow-inner">
                                <input type="text" name="skillName" value={editFormData.skillName || ''} onChange={handleInputChange} className="text-xs w-24 px-2 py-0.5 focus:outline-none bg-slate-900 text-slate-100 border border-slate-800 rounded" />
                                <button onClick={() => handleSaveEdit(skill.id, 'skills')} className="text-green-400 p-1 hover:bg-slate-900 rounded transition"><Check size={12}/></button>
                                <button onClick={handleCancelEdit} className="text-slate-500 p-1 hover:bg-slate-900 rounded transition"><X size={12}/></button>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 text-slate-300 text-xs rounded-lg border border-slate-800/80 font-medium hover:border-slate-700 transition">
                                {skill.skillName}
                                {isAdmin && isEditingMode && (
                                  <button onClick={() => handleStartEdit(skill, 'skills')} className="text-slate-500 hover:text-green-400 border-l border-slate-800 pl-2 ml-1 transition"><Edit2 size={11} /></button>
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

            {/* INTERFACE PANEL: ACHIEVEMENTS */}
            <div className={activeTab === 'achievements' ? 'block' : 'hidden'}>
              <h2 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3 mb-6 flex items-center gap-2">
                <Award className="text-green-500" size={20} /> Honors & Achievements
              </h2>
              {achievements && achievements.length > 0 && (
                <div className="space-y-6">
                  {achievements.map((ach) => (
                    <div key={ach.id} className="relative border-b border-slate-800/60 pb-5 last:border-0 last:pb-0 group">
                      {editingItemId === ach.id ? (
                        <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Award / Certificate Title</label>
                              <input type="text" name="title" value={editFormData.title || ''} onChange={handleInputChange} className={inputStyle} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Issue Date</label>
                              <input type="text" name="issueDate" value={editFormData.issueDate || ''} onChange={handleInputChange} className={inputStyle} placeholder="e.g., 2026" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description / Credentials</label>
                              <textarea name="description" rows={3} value={editFormData.description || ''} onChange={handleInputChange} className={`${inputStyle} resize-y`} />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
                            <button onClick={handleCancelEdit} className="text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-800 transition">Cancel</button>
                            <button onClick={() => handleSaveEdit(ach.id, 'achievements')} className="text-[11px] font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-md hover:bg-green-500/20 transition">Save Changes</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isAdmin && isEditingMode && (
                            <div className="absolute top-0 right-0 z-10">
                              <button onClick={() => handleStartEdit(ach, 'achievements')} className="p-1.5 bg-slate-950 text-slate-400 hover:text-green-400 border border-slate-800 rounded-lg shadow-sm transition"><Edit2 size={12} /></button>
                            </div>
                          )}
                          <div className="space-y-1.5 pr-10 text-sm">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
                              <h3 className="font-bold text-slate-100 text-base tracking-tight">{ach.title}</h3>
                              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 shrink-0 bg-slate-950/60 px-2 py-0.5 border border-slate-900 rounded"><Calendar className="w-3 h-3 text-green-500" /> {ach.issueDate}</span>
                            </div>
                            {ach.description && (
                              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                                {ach.description}
                              </p>
                            )}
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