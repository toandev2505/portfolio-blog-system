import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

export default function DiagramDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project] = useState(null);
  const [diagramList, setDiagramList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/v1/public/projects/${slug}`);
        const data = response.data;
        
        // TRƯỜNG DỮ LIỆU CHÍNH XÁC LÀ: data.diagramLinks
        if (data.diagramLinks) {
          const list = data.diagramLinks.split(',').map(link => link.trim());
          setDiagramList(list);
        }
      } catch (err) {
        console.error("Lỗi tải diagram:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="text-white text-center py-20">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-green-400 hover:text-white">
          ← Quay lại dự án
        </button>
        
        <h2 className="text-2xl font-bold mb-8 text-slate-100 border-b border-green-500/20 pb-4">
          Diagrams: {project?.name}
        </h2>

        {diagramList.length > 0 ? (
          <div className="space-y-12">
            {diagramList.map((link, index) => (
              <div key={index} className="bg-slate-800/40 p-4 rounded-xl border border-green-500/20 shadow-xl">
                <p className="text-xs text-slate-400 mb-2 font-mono">Diagram #{index + 1}</p>
                <img 
                  src={link} 
                  alt={`Diagram ${index + 1}`} 
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500">Không có diagram nào được tìm thấy.</div>
        )}
      </div>
    </div>
  );
}