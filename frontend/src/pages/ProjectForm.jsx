import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image, UploadCloud, Code2 } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function ProjectForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const projectId = searchParams.get('id'); 
  const isEditMode = !!projectId;

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [architectures, setArchitectures] = useState([]);

  const CLOUD_NAME = "dnpcvirql";
  const UPLOAD_PRESET = "my-preset-1";

  const [formData, setFormData] = useState({
    architectureId: '',
    title: '',
    role: '',
    teamSize: '',
    techInput: '', 
    description: '',
    highlightFeatures: '',
    projectLinks: '',
    diagramLinks: '',
    githubLink: '',
    demoLink: '',
    thumbnailLink: '',
    fromDate: '',
    toDate: ''
  });

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const initializeForm = async () => {
      try {
        const archResponse = await axiosInstance.get('/v1/public/architectures');
        setArchitectures(archResponse.data || []);

        if (isEditMode) {
          const response = await axiosInstance.get(`/v1/public/projects/${projectId}`);
          const project = response.data;

          setFormData({
            architectureId: project.architecture?.id || '',
            title: project.title || '',
            role: project.role || '',
            teamSize: project.teamSize || '',
            techInput: project.technologies || '', 
            description: project.description || '',
            highlightFeatures: project.highlightFeatures || '',
            projectLinks: project.projectLinks || '',
            diagramLinks: project.diagramLinks || '',
            githubLink: project.githubLink || '',
            demoLink: project.demoLink || '',
            thumbnailLink: project.thumbnailLink || '',
            fromDate: project.fromDate || '',
            toDate: project.toDate || ''
          });
        }
      } catch (err) {
        console.error('Error loading form configuration:', err);
        setError('Unable to load form initialization or architecture configuration.');
      } finally {
        setPageLoading(false);
      }
    };

    initializeForm();
  }, [projectId, isEditMode]);

  const handleOpenUploadWidget = () => {
    if (!window.cloudinary) {
      alert("Image upload system is not ready yet, please try again in a few seconds!");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        styles: {
          palette: {
            window: '#0F172A',
            windowBorder: '#334155',
            tabIcon: '#22C55E',
            textMain: '#F1F5F9',
            textLink: '#4ADE80',
            action: '#22C55E',
            inactiveTabIcon: '#64748B',
            error: '#EF4444',
            inProgress: '#22C55E',
            complete: '#4ADE80',
            sourceBg: '#1E293B'
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFormData(prev => ({ ...prev, thumbnailLink: result.info.secure_url }));
        }
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    const payload = {
      architectureId: formData.architectureId ? parseInt(formData.architectureId, 10) : null,
      title: formData.title,
      role: formData.role,
      teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : null,
      technologies: formData.techInput, 
      description: formData.description,
      highlightFeatures: formData.highlightFeatures,
      projectLinks: formData.projectLinks,
      diagramLinks: formData.diagramLinks,
      githubLink: formData.githubLink,
      demoLink: formData.demoLink,
      thumbnailLink: formData.thumbnailLink,
      fromDate: formData.fromDate,
      toDate: formData.toDate
    };

    try {
      if (isEditMode) {
        await axiosInstance.put(`/v1/admin/projects/${projectId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Project updated successfully!');
        navigate(`/projects/${projectId}`);
      } else {
        await axiosInstance.post('/v1/admin/projects', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Project added successfully!');
        navigate('/projects');
      }
    } catch (err) {
      console.error('Error saving project data:', err);
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('System error occurred. Please double-check Admin permissions or input data.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const inputStyle = "w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-lg focus:ring-2 focus:ring-green-500/30 focus:border-green-400 outline-none text-sm text-slate-100 placeholder-slate-500 transition-all duration-200";

  if (pageLoading) return <div className="text-center py-20 text-slate-500 bg-slate-950 min-h-screen">Loading form configuration...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          to={isEditMode ? `/projects/${projectId}` : "/projects"} 
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 mb-6 transition-colors font-medium w-fit"
        >
          <ArrowLeft size={16} /> {isEditMode ? 'Cancel Edit & Go Back' : 'Back to Project List'}
        </Link>

        <div className="bg-slate-900/40 backdrop-blur-md border border-green-500/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <Code2 className="text-green-400" size={24} />
              {isEditMode ? 'Edit Project' : 'Add New Project'}
            </h1>
            {isEditMode && (
              <span className="text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded">ID: #{projectId}</span>
            )}
          </div>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ROW 1: Project Title & Architecture */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Title *</label>
                <input
                  type="text" required name="title" value={formData.title} onChange={handleChange}
                  placeholder="e.g., HEMIS Management System"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Architecture *</label>
                <select
                  required name="architectureId" value={formData.architectureId} onChange={handleChange}
                  className={`${inputStyle} bg-slate-900`}
                >
                  <option value="">-- Select Architecture --</option>
                  {architectures.map(arch => (
                    <option key={arch.id} value={arch.id} className="bg-slate-900 text-slate-100">
                      {arch.name || arch.title || `ID: ${arch.id}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ROW 2: Role, Team Size & Period */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role in Project</label>
                <input
                  type="text" name="role" value={formData.role} onChange={handleChange}
                  placeholder="e.g., Backend Developer"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team Size</label>
                <input
                  type="number" name="teamSize" value={formData.teamSize} onChange={handleChange}
                  placeholder="e.g., 5" min="1"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Timeline (From - To)</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text" name="fromDate" value={formData.fromDate} onChange={handleChange}
                    placeholder="03/2026"
                    className={`${inputStyle} text-center text-xs`}
                  />
                  <span className="text-slate-500 text-xs px-0.5">to</span>
                  <input
                    type="text" name="toDate" value={formData.toDate} onChange={handleChange}
                    placeholder="Present"
                    className={`${inputStyle} text-center text-xs`}
                  />
                </div>
              </div>
            </div>

            {/* ROW 3: Technologies Used */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies (Separated by commas)</label>
              <input
                type="text" name="techInput" value={formData.techInput} onChange={handleChange}
                placeholder="e.g., Java, Spring Boot, React Native, MySQL"
                className={inputStyle}
              />
            </div>

            {/* ROW 4: Thumbnail Link */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Thumbnail Image *</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-dashed border-slate-800 bg-slate-950/50 rounded-xl w-full">
                
                <button
                  type="button" onClick={handleOpenUploadWidget}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-md shrink-0"
                >
                  <UploadCloud size={16} className="text-green-400" />
                  Upload Image to Cloud
                </button>

                <div className="flex-grow w-full">
                  {formData.thumbnailLink ? (
                    <div className="flex items-center gap-3 bg-slate-900/60 p-2 border border-slate-800 rounded-lg">
                      <img 
                        src={formData.thumbnailLink} 
                        alt="Preview" 
                        className="w-16 h-10 object-cover rounded border border-slate-700"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[11px] text-green-400 font-bold block">✓ Uploaded Successfully</span>
                        <span className="text-[10px] text-slate-500 truncate block max-w-xs sm:max-w-md font-mono">{formData.thumbnailLink}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic flex items-center gap-1.5 py-2">
                      <Image size={14} /> No image selected yet.
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* ROW 5: GitHub & Live Demo Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">GitHub Link (URL)</label>
                <input
                  type="url" name="githubLink" value={formData.githubLink} onChange={handleChange}
                  placeholder="https://github.com/..."
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live Demo Link (URL)</label>
                <input
                  type="url" name="demoLink" value={formData.demoLink} onChange={handleChange}
                  placeholder="https://..."
                  className={inputStyle}
                />
              </div>
            </div>

            {/* ROW 6: Diagram & Extended Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diagram Links</label>
                <input
                  type="text" name="diagramLinks" value={formData.diagramLinks} onChange={handleChange}
                  placeholder="e.g., Links to UseCase, DFD, Architecture diagrams..."
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Links (Other links)</label>
                <input
                  type="text" name="projectLinks" value={formData.projectLinks} onChange={handleChange}
                  placeholder="e.g., SRS documentation link, research reports..."
                  className={inputStyle}
                />
              </div>
            </div>

            {/* ROW 7: Highlight Features */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Highlight Features</label>
              <textarea
                rows={3} name="highlightFeatures" value={formData.highlightFeatures} onChange={handleChange}
                placeholder="e.g.,&#10;- Semantic search for research papers using NLP Embeddings.&#10;- Multi-role workflow authorization with 5 distinct states (Draft -> Pending -> Rejected -> Verified -> Published)..."
                className={`${inputStyle} resize-y`}
              ></textarea>
            </div>

            {/* ROW 8: Project Description */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Description *</label>
              <textarea
                required rows={5} name="description" value={formData.description} onChange={handleChange}
                placeholder="Provide a detailed description of the actual problem statement, technological solutions, and layered system architecture processing..."
                className={`${inputStyle} resize-y`}
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit" disabled={submitLoading}
                className="w-full flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 disabled:bg-slate-800 text-green-400 disabled:text-slate-500 border border-green-500/20 disabled:border-slate-800 font-semibold py-3 rounded-lg shadow-xl transition-all duration-200"
              >
                {submitLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {submitLoading 
                  ? 'Processing transaction...' 
                  : (isEditMode ? 'Update Changes' : 'Save & Publish Project')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}