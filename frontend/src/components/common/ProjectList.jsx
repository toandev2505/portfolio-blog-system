import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get('/v1/public/projects');
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi gọi API: ", err);
                setError("Không thể tải danh sách dự án. Vui lòng thử lại sau!");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    //Xử lý giao diện khi đang tải hoặc gặp lỗi
    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Danh Sách Dự Án Portfolio</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {projects.map((project) => (
                    <div key={project.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        {/* Ảnh thumbnail */}
                        <img 
                            src={project.thumbnailLink || 'https://via.placeholder.com/300x150'} 
                            alt={project.title} 
                            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                        />
                        
                        {/* Nội dung dự án */}
                        <div style={{ padding: '15px' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{project.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', height: '60px', overflow: 'hidden' }}>{project.description}</p>
                            
                            {/* Danh sách công nghệ (techList đã được cắt mảng ở Backend) */}
                            <div style={{ margin: '10px 0' }}>
                                <strong>Công nghệ: </strong>
                                {project.techList && project.techList.map((tech, index) => (
                                    <span key={index} style={{ backgroundColor: '#f0f0f0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', marginRight: '5px', display: 'inline-block', marginBottom: '5px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Link liên kết */}
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>GitHub</a>}
                                {project.demoLink && <a href={project.demoLink} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Live Demo</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;