import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit2, Trash2, Calendar, User, 
  ExternalLink, Users, Layers, Binary
} from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function ProjectDetail() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await axiosInstance.get(`/v1/public/projects/${slug}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error loading project details:", err);
        setError("Could not load project information or the project does not exist.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProjectDetail();
  }, [slug]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this project?")) {
      try {
        await axiosInstance.delete(`/v1/admin/projects/${project.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Project deleted successfully!");
        navigate('/projects'); 
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Deletion failed! Please check your Admin permissions.");
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-500 bg-slate-950 min-h-screen">Loading project information...</div>;
  if (error) return <div className="text-center py-20 text-red-400 bg-slate-950 min-h-screen font-medium">{error}</div>;
  if (!project) return null;

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">

        {/* NAVIGATION & MANAGEMENT TOOLBAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <Link to="/projects" className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors font-medium">
            <ArrowLeft size={16} /> Back to project list
          </Link>

          {isAdmin && (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => navigate(`/project/edit?id=${project.slug}`)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <Edit2 size={14} /> Edit Project
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-950/30 hover:bg-red-950/50 text-red-400 border border-red-900/40 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <Trash2 size={14} /> Delete Project
              </button>
            </div>
          )}
        </div>

        {/* PROJECT IMAGE BANNER */}
        <div className="w-full h-64 sm:h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
          <img 
            src={project.thumbnailLink || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200'} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </div>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* MAIN DETAILS PANEL */}
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                <span>Project ID: #{project.id}</span>
                <span>•</span>
                <span className="bg-slate-900 px-2 py-0.5 border border-slate-800 rounded">Slug: {project.slug}</span>
              </div>
            </div>

            {/* DETAILED DESCRIPTION */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-2">
                <Layers size={18} className="text-green-400" /> Detailed Project Description
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-normal">
                {project.description || 'No detailed specifications have been provided for this project.'}
              </p>
            </div>

            {/* HIGHLIGHT FEATURES SECTION */}
            {project.highlightFeatures && (
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Binary size={18} className="text-green-400" /> Highlight Features
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-mono bg-slate-900/30 border border-slate-800/80 rounded-xl p-4">
                  {project.highlightFeatures}
                </p>
              </div>
            )}
          </div>

          {/* META-DATA SIDEBAR PANEL */}
          <div className="space-y-6 bg-slate-900/30 backdrop-blur-md border border-slate-800 p-6 rounded-xl shadow-xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-green-400 border-b border-slate-800 pb-2">
              Project Profile
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><User size={14} /> Role:</span>
                <span className="font-semibold text-slate-300">{project.role || 'Developer'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Layers size={14} /> Architecture:</span>
                <span className="font-mono text-green-400 bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">
                  {project.architecture?.name || 'Standard Architecture'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Users size={14} /> Team Size:</span>
                <span className="font-semibold text-slate-300 font-mono">{project.teamSize ? `${project.teamSize} Member(s)` : 'Individual'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={14} /> Timeline:</span>
                <span className="font-semibold text-slate-400 font-mono">{project.fromDate || 'N/A'} - {project.toDate || 'Present'}</span>
              </div>
            </div>

            {/* ACTION EXTERNAL SYSTEM LINKAGES */}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              {project.githubLink && (
                <a 
                  href={project.githubLink} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 py-2 rounded-lg text-xs font-semibold transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.demoLink && (
                <a 
                  href={project.demoLink} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 py-2 rounded-lg text-xs font-semibold transition-all shadow-md"
                >
                  <ExternalLink size={14} /> Live Demo Instance
                </a>
              )}
              {project.diagramLinks && (
                <a 
                  href={project.diagramLinks} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-300 border border-slate-800/60 py-2 rounded-lg text-xs font-normal transition-all"
                >
                  System Diagrams
                </a>
              )}
              {project.projectLinks && (
                <a 
                  href={project.projectLinks} target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-300 border border-slate-800/60 py-2 rounded-lg text-xs font-normal transition-all"
                >
                  Project Documents
                </a>
              )}
            </div>

            {/* TECHNOLOGY METRICS MATRICES */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Technologies Stack</span>
              <div className="flex flex-wrap gap-1">
                {project.techList && project.techList.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="bg-slate-950 text-slate-300 text-[10px] font-mono tracking-wide px-2 py-0.5 rounded border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
    </div>
  );
}