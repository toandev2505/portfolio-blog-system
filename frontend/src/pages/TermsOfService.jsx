import React, { useEffect } from 'react';
import { Scale, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
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
            <Scale size={32} />
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">Terms of Service</h1>
          </div>
          <p className="text-xs text-slate-400 font-medium">Last updated: June 2026</p>
        </div>

        {/* INTRODUCTION */}
        <section className="space-y-3">
          <p className="text-slate-300 leading-relaxed">
            Welcome to <span className="text-green-400 font-semibold">MyPortfolio</span>! These terms and conditions outline the rules and regulations for the use of our website and all related technical sub-systems.
          </p>
          <p className="text-slate-300 leading-relaxed">
            By accessing this website, we assume you accept these terms of service in full. Do not continue to use MyPortfolio if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        {/* 1. INTELLECTUAL PROPERTY RIGHTS */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <ShieldCheck size={18} /> 1. Intellectual Property Rights
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unless otherwise stated, <span className="text-slate-200 font-medium">Toan Dev</span> owns the intellectual property rights for all materials, source codes, layout architectures, and technical blog posts published on this portfolio. All intellectual property rights are reserved. You may view and/or print pages for your own personal use subject to restrictions set in these terms of service.
          </p>
          <p className="text-sm text-amber-400/90 font-medium">
            You must not: Republication of source code, distribution, duplication, or reproduction of commercial content from this system without explicit prior written authorization is strictly prohibited.
          </p>
        </section>

        {/* 2. USER RESTRICTIONS & RESPONSIBILITIES */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <AlertTriangle size={18} /> 2. User Restrictions & Account Safety
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            As a user or evaluator of this system, you are specifically restricted from all of the following:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1.5">
            <li>Using this website in any way that is or may be damaging to this website.</li>
            <li>Using this website in any way that impacts user access to this website.</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity.</li>
            <li>Attempting to bypass authentication mechanisms or executing unauthorized scripts against our REST APIs.</li>
          </ul>
        </section>

        {/* 3. DISCLAIMER & LIMITATION OF LIABILITY */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300 flex items-center gap-2">
            <HelpCircle size={18} /> 3. Disclaimer & Limitation of Liability
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            This website and its source showcase materials are provided "as is," with all faults, and we express no representations or warranties, of any kind related to this website or the materials contained on this website. 
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            The project portfolio and workflows serve as technical demonstration implementations. We shall not be held liable for any system errors, server downtimes, or data anomalies arising from external third-party uses.
          </p>
        </section>

        {/* 4. GOVERNING LAW */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-green-300">4. Governing Law</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            These Terms will be governed by and interpreted in accordance with local regulations and cyber-security standards, and you submit to the non-exclusive jurisdiction of the state and federal courts located in your country for the resolution of any disputes.
          </p>
        </section>

      </div>
    </div>
  );
}