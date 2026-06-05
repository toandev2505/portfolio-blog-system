import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

import bgImg from '../assets/rocklee-bg.png';

export default function Blog() {
  return (
    // min-h-full giúp container chiếm không gian của flex-grow trong AppLayout
    <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
      <div 
        className="fixed inset-0 z-0" 
        style={{ backgroundImage: `url('${bgImg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="fixed inset-0 z-0 bg-black/70" />

      {/* Khối Card thông báo */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-green-500/20 p-10 rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/10 p-4 rounded-full">
            <Construction size={48} className="text-lime-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Trang đang hoàn thiện
        </h1>
        
        <p className="text-slate-400 mb-8 leading-relaxed">
          Chúng tôi đang nỗ lực xây dựng những nội dung thú vị cho trang Blog. 
          Vui lòng quay lại sau nhé!
        </p>

        <Link
          to="/" 
          className="inline-block px-6 py-2.5 bg-green-700/80 hover:bg-green-600 text-white font-semibold rounded-lg border border-green-500/30 transition-all active:scale-95"
        >
          Trở về Trang chủ
        </Link>
      </div>
      
    </div>
  );
}