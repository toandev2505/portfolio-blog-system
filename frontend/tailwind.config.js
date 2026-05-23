/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Định nghĩa lại toàn bộ hệ thống màu sắc dùng chung
      colors: {
        brand: {
          primary: '#10b981',   /* Xanh lá chủ đạo (Emerald 500) */
          hover: '#059669',     /* Xanh lá khi hover chuột (Emerald 600) */
          light: '#ecfdf5',     /* Xanh lá siêu nhạt làm nền (Emerald 50) */
          dark: '#064e3b',      /* Xanh lá đậm cho text/tiêu đề (Emerald 900) */
        }
      },
      borderRadius: {
        DEFAULT: '4px',
        'lg': '8px',
      }
    },
  },
  plugins: [],
}