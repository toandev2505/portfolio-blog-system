import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  // Tự động cuộn lên đầu trang khi vào giao diện này
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 font-sans py-12 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto border border-green-500/15 bg-slate-900/50 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-2xl space-y-8">
        
        {/* HEADER */}
        <div className="border-b border-green-500/15 pb-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-green-400">
            <Shield size={32} />
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">Privacy Policy</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">Last updated: June 2026</p>
        </div>

        {/* INTRODUCTION */}
        <section className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            Welcome to <span className="text-green-400 font-semibold">MyPortfolio</span>. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by our platform and how we use it.
          </p>
          <p className="text-slate-300 leading-relaxed">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>

        {/* 1. INFORMATION WE COLLECT */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <Eye size={18} /> 1. Information We Collect
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We only collect information about you if we have a reason to do so – for example, to provide our services, to communicate with you, or to make our services better.
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
            <li>
              <strong className="text-slate-200">Account Credentials:</strong> When you log in as an Admin or authorized user, we securely process your username and credentials to authenticate your session.
            </li>
            <li>
              <strong className="text-slate-200">Local Storage Data:</strong> We store small data pieces such as <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs text-lime-400 font-mono">accessToken</code>, <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs text-lime-400 font-mono">role</code>, and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs text-lime-400 font-mono">username</code> directly in your browser's local storage to maintain your authentication state.
            </li>
          </ul>
        </section>

        {/* 2. HOW WE USE INFORMATION */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <Lock size={18} /> 2. How We Use Information
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1.5">
            <li>Provide, operate, and maintain our system workflows.</li>
            <li>Improve, personalize, and expand our portfolio functionalities.</li>
            <li>Understand and analyze how you interact with our applications and REST APIs.</li>
            <li>Authenticate administrative permissions to manage projects and thesis submissions safely.</li>
          </ul>
        </section>

        {/* 3. SECURITY OF DATA */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <FileText size={18} /> 3. Security of Data
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The security of your data is important to us. All authentication data exchanged with our Spring Boot backend framework is encrypted using modern security practices. However, remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
          </p>
        </section>

        {/* 4. CHANGES TO THIS PRIVACY POLICY */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300">4. Changes to This Privacy Policy</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted.
          </p>
        </section>
        
      </div>
    </div>
  );
}