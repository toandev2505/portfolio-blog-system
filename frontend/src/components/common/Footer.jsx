import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 h-16 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div>
          &copy; {currentYear} John Doe. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-2 sm:mt-0">
          <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
          <a href="mailto:contact@example.com" className="hover:text-black transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}