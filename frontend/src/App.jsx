import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Layout & Pages
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ProjectForm from './pages/ProjectForm';
import ResumePage from './pages/ResumePage';
import ProfileCardPage from './pages/ProfileCardPage';
import Blog from './pages/Blog';
import About from './pages/AboutMe';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <>
      {/* Đặt Toaster bên ngoài Routes để hiển thị đè lên toàn bộ app */}
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#0f172a', // Slate-900
            color: '#e2e8f0',      // Slate-200
            border: '1px solid #22c55e', // Green-500
            borderRadius: '0.5rem',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            style: { border: '1px solid #ef4444' }, // Red-500
          },
        }}
      />

      <Routes>
        {/* Nhóm các trang có Header và Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/project/edit" element={<ProjectForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/profile/:username" element={<ProfileCardPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>

        {/* Nhóm các trang KHÔNG có Header và Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;