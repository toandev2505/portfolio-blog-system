import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Đường dẫn gốc API Backend của bạn
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// BẮT BUỘC: Dùng Request Interceptor để mỗi lần bấm nút "Lưu", 
// Axios sẽ vào LocalStorage lôi cái accessToken mới nhất ra gửi đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Luôn luôn lấy token mới nhất ngay tại thời điểm gửi request
    const token = localStorage.getItem('accessToken'); 
    
    if (token) {
      // Gán chuẩn Authorization Bearer kèm theo token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;