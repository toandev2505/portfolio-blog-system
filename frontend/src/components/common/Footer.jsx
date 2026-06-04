import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-green-500/15 bg-slate-900/60 backdrop-blur-sm mt-auto text-slate-400">
      <div className="max-w-6xl mx-auto px-4 h-16 flex flex-col sm:flex-row items-center justify-between text-xs">
        <div className="tracking-wide">
          &copy; {currentYear} Toan Dev. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-2 sm:mt-0 font-medium">
          <a href="/privacy" className="hover:text-lime-400 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-lime-400 transition-colors">Terms of Service</a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=toandev2505@gmail.com&su=Feedback%20from%20Portfolio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-lime-400 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}