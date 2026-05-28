import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image, UploadCloud } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';

export default function ProjectForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Lấy 'id' từ query string trên URL (ví dụ: /project/edit?id=123)
  const projectId = searchParams.get('id'); 
  const isEditMode = !!projectId; // Nếu có id thì là TRUE (chế độ sửa), ngược lại là FALSE (thêm mới)

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  // State lưu danh sách Kiến trúc hệ thống phục vụ cho ô Select
  const [architectures, setArchitectures] = useState([]);

  // Cloud storage Config
  const CLOUD_NAME = "dnpcvirql";
  const UPLOAD_PRESET = "my-preset-1";

  // State quản lý toàn bộ dữ liệu trong biểu mẫu - Khớp 100% với ProjectEntity / ProjectRequestDTO
  const [formData, setFormData] = useState({
    architectureId: '',
    title: '',
    role: '',
    teamSize: '',
    techInput: '', // Nhận chuỗi dạng text phân tách bằng dấu phẩy để hiển thị ở Form
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

  // Khởi tạo dữ liệu khi vào trang
  useEffect(() => {
    const initializeForm = async () => {
      try {
        // 1. Tải danh sách kiến trúc hệ thống trước để hiển thị ở ô Select Option
        const archResponse = await axiosInstance.get('/v1/public/architectures');
        setArchitectures(archResponse.data || []);

        // 2. Nếu ở chế độ Chỉnh sửa, lấy tiếp dữ liệu cũ của Project
        if (isEditMode) {
          const response = await axiosInstance.get(`/v1/public/projects/${projectId}`);
          const project = response.data;

          setFormData({
            architectureId: project.architecture?.id || '',
            title: project.title || '',
            role: project.role || '',
            teamSize: project.teamSize || '',
            techInput: project.technologies || '', // Nhận chuỗi trực tiếp từ DB
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
        console.error('Lỗi khi tải cấu hình biểu mẫu:', err);
        setError('Không thể tải thông tin khởi tạo hoặc cấu hình hệ thống.');
      } finally {
        setPageLoading(false);
      }
    };

    initializeForm();
  }, [projectId, isEditMode]);

  // HÀM MỞ WIDGET UPLOAD CỦA CLOUDINARY
  const handleOpenUploadWidget = () => {
    if (!window.cloudinary) {
      alert("Hệ thống tải ảnh chưa sẵn sàng, vui lòng thử lại sau vài giây!");
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
            window: '#FFFFFF',
            windowBorder: '#90A4AE',
            tabIcon: '#0078FF',
            textMain: '#2A2A2A',
            textLink: '#0078FF',
            action: '#0078FF',
            inactiveTabIcon: '#E4E4E4',
            error: '#F44336',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#F4F4F5'
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload thành công! Dữ liệu ảnh: ", result.info);
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

    // Chuẩn bị payload chuẩn hóa kiểu dữ liệu khớp với RequestDTO ở Backend
    const payload = {
      architectureId: formData.architectureId ? parseInt(formData.architectureId, 10) : null,
      title: formData.title,
      role: formData.role,
      teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : null,
      technologies: formData.techInput, // Gửi chuỗi text thô sang cho backend
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
        // Chế độ CHỈNH SỬA: Gọi API PUT
        await axiosInstance.put(`/v1/admin/projects/${projectId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Cập nhật dự án thành công!');
        navigate(`/projects/${projectId}`);
      } else {
        // Chế độ THÊM MỚI: Gọi API POST
        await axiosInstance.post('/v1/admin/projects', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Thêm dự án thành công!');
        navigate('/projects');
      }
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Đã xảy ra lỗi hệ thống. Vui lòng kiểm tra lại quyền Admin hoặc dữ liệu đầu vào.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) return <div className="text-center py-20 text-gray-500">Đang tải cấu hình biểu mẫu...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Nút quay lại linh hoạt */}
      <Link 
        to={isEditMode ? `/projects/${projectId}` : "/projects"} 
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> {isEditMode ? 'Hủy chỉnh sửa & Quay lại' : 'Quay lại danh sách'}
      </Link>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
          </h1>
          {isEditMode && (
            <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded">ID: #{projectId}</span>
          )}
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* HÀNG 1: Tiêu đề dự án & Kiến trúc hệ thống */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tiêu đề dự án *</label>
              <input
                type="text" required name="title" value={formData.title} onChange={handleChange}
                placeholder="Ví dụ: Hệ thống quản lý HEMIS"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kiến trúc hệ thống *</label>
              <select
                required name="architectureId" value={formData.architectureId} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition bg-white"
              >
                <option value="">-- Chọn kiến trúc --</option>
                {architectures.map(arch => (
                  <option key={arch.id} value={arch.id}>
                    {arch.name || arch.title || `ID: ${arch.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* HÀNG 2: Vai trò, Quy mô nhóm & Khoảng thời gian thực hiện */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Vai trò trong dự án</label>
              <input
                type="text" name="role" value={formData.role} onChange={handleChange}
                placeholder="Ví dụ: Backend Developer"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Quy mô nhóm (Team Size)</label>
              <input
                type="number" name="teamSize" value={formData.teamSize} onChange={handleChange}
                placeholder="Ví dụ: 5" min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Thời gian (From - To)</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text" name="fromDate" value={formData.fromDate} onChange={handleChange}
                  placeholder="03/2026"
                  className="w-full px-2 py-2.5 border border-gray-300 rounded-lg text-center text-xs outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-gray-400 text-xs">đến</span>
                <input
                  type="text" name="toDate" value={formData.toDate} onChange={handleChange}
                  placeholder="Present"
                  className="w-full px-2 py-2.5 border border-gray-300 rounded-lg text-center text-xs outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* HÀNG 3: Công nghệ sử dụng */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Công nghệ (Cách nhau bằng dấu phẩy)</label>
            <input
              type="text" name="techInput" value={formData.techInput} onChange={handleChange}
              placeholder="Ví dụ: Java, Spring Boot, React Native, MySQL"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
            />
          </div>

          {/* HÀNG 4: Thumbnail Link (Cloudinary Cloud Storage) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Ảnh đại diện dự án *</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 w-full">
              
              <button
                type="button" onClick={handleOpenUploadWidget}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-sm shrink-0"
              >
                <UploadCloud size={16} className="text-blue-500" />
                Tải ảnh lên Cloud
              </button>

              <div className="flex-grow w-full">
                {formData.thumbnailLink ? (
                  <div className="flex items-center gap-3 bg-white p-2 border border-gray-200 rounded-lg shadow-2xs">
                    <img 
                      src={formData.thumbnailLink} 
                      alt="Preview" 
                      className="w-16 h-10 object-cover rounded-md border"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[11px] text-green-600 font-bold block">✓ Đã tải lên thành công</span>
                      <span className="text-[10px] text-gray-400 truncate block max-w-xs sm:max-w-md">{formData.thumbnailLink}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500 italic flex items-center gap-1.5 py-2">
                    <Image size={14} /> Chưa có ảnh nào được chọn.
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* HÀNG 5: Các liên kết URL (GitHub & Live Demo) */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Link GitHub (URL)</label>
              <input
                type="url" name="githubLink" value={formData.githubLink} onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Link Live Demo (URL)</label>
              <input
                type="url" name="demoLink" value={formData.demoLink} onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
          </div>

          {/* HÀNG 6: Sơ đồ hệ thống & Các liên kết mở rộng */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Link Sơ đồ (Diagram Links)</label>
              <input
                type="text" name="diagramLinks" value={formData.diagramLinks} onChange={handleChange}
                placeholder="Ví dụ: Link ảnh sơ đồ UseCase, DFD, Architecture..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Các liên kết khác (Project Links)</label>
              <input
                type="text" name="projectLinks" value={formData.projectLinks} onChange={handleChange}
                placeholder="Ví dụ: Link tài liệu SRS, báo cáo nghiên cứu..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition"
              />
            </div>
          </div>

          {/* HÀNG 7: Tính năng nổi bật */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tính năng nổi bật (Highlight Features)</label>
            <textarea
              rows={3} name="highlightFeatures" value={formData.highlightFeatures} onChange={handleChange}
              placeholder="Ví dụ:&#10;- Tìm kiếm ngữ nghĩa bài báo nghiên cứu bằng NLP Embeddings.&#10;- Quy trình phê duyệt biểu mẫu dữ liệu qua 5 trạng thái (Draft -> Published)..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition resize-y"
            ></textarea>
          </div>

          {/* HÀNG 8: Mô tả chi tiết dự án */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mô tả dự án *</label>
            <textarea
              required rows={5} name="description" value={formData.description} onChange={handleChange}
              placeholder="Mô tả chi tiết bài toán thực tế, giải pháp công nghệ và kiến trúc phân tầng xử lý hệ thống..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition resize-y"
            ></textarea>
          </div>

          {/* NÚT SUBMIT */}
          <div className="pt-2">
            <button
              type="submit" disabled={submitLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg shadow-sm transition"
            >
              {submitLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {submitLoading 
                ? 'Đang xử lý...' 
                : (isEditMode ? 'Cập nhật thay đổi' : 'Lưu và Đăng dự án')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}