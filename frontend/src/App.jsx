import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home'
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ProjectForm from './pages/ProjectForm';
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
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/project/edit" element={<ProjectForm />} />
      </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
