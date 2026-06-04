import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Eye, Layers } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');
  const isAdmin = token && userRole === 'ADMIN';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/v1/public/projects');
        setProjects(response.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to permanently delete this project?")) {
      try {
        await axiosInstance.delete(`/v1/admin/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(projects.filter(p => p.id !== projectId));
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Action failed! Admin privileges required or session expired.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-400 rounded-full animate-spin"></div>
          <span>Loading project list...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-green-500/15 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">
              Portfolio Projects
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Explore professional systems, microservices architectures, and technical workflows.
            </p>
          </div>

          {isAdmin && (
            <button 
              onClick={() => navigate('/project/edit')}
              className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-2.5 rounded-lg font-medium transition shadow-md hover:shadow-green-500/5"
            >
              <Plus size={18} /> Add New Project
            </button>
          )}
        </div>

        {/* PROJECTS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-green-500/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              
              {/* ACTION BUTTON OVERLAYS */}
              <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isAdmin ? (
                  <>
                    <button 
                      onClick={() => navigate(`/project/edit?id=${project.slug}`)}
                      className="p-2 bg-slate-900/90 text-slate-300 rounded-lg hover:text-green-400 border border-slate-700 hover:border-green-500/30 shadow-md transition-all"
                      title="Edit Project"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-slate-900/90 text-slate-300 rounded-lg hover:text-red-400 border border-slate-700 hover:border-red-500/30 shadow-md transition-all"
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="p-2 bg-slate-900/90 text-slate-300 rounded-lg hover:text-green-400 border border-slate-700 hover:border-green-500/30 shadow-md transition-all"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>
                )}
              </div>

              {/* IMAGE THUMBNAIL */}
              <Link to={`/projects/${project.slug}`} className="h-48 bg-slate-950 overflow-hidden block relative border-b border-slate-800">
                <img 
                  src={project.thumbnailLink || 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600'} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              </Link>

              {/* CONTENT CARD */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 bg-slate-950 text-slate-400 text-[11px] px-2.5 py-1 rounded-md border border-slate-800 font-medium">
                    <Layers size={11} className="text-green-500" />
                    {project.role || 'Developer'}
                  </span>
                  
                  <h3 className="font-bold text-xl text-slate-100 tracking-tight line-clamp-1 hover:text-green-400 transition-colors">
                    <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* TECHNOLOGIES LIST */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techList && project.techList.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="bg-green-500/5 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/10 font-mono tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-medium">
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-slate-100 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>

                  <button 
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="flex items-center gap-1 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
                  >
                    Details &rarr;
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 bg-slate-900/10 rounded-xl text-slate-500">
            No projects found in the system.
          </div>
        )}

      </div>
    </div>
  );
}