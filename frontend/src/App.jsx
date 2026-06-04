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
import About from './pages/AboutMe';
import Login from './pages/Login'

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      
      <Header />

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
        <Route path="/about" element={<About />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
