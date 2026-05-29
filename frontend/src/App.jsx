import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Home from './pages/Home'
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ProjectForm from './pages/ProjectForm';
import ResumePage from './pages/ResumePage';
import ProfileCardPage from './pages/ProfileCardPage';
import Blog from './pages/Blog';
import Login from './pages/Login'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      
      {/* Header đặt ở đây sẽ luôn xuất hiện ở TẤT CẢ các trang với cùng 1 giao diện */}
      <Header />

      {/* Phần nội dung trang sẽ thay đổi linh hoạt bên dưới */}
      <main className="flex-grow">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/project/edit" element={<ProjectForm />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/resume" element={<ResumePage />} />
        <Route path="/profile/:username" element={<ProfileCardPage />} />
      </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
