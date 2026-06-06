# Portfolio Blog System

A modern portfolio and blog platform that allows developers to showcase their projects, skills, and articles in a single responsive website.

## ✨ Features

* Personal portfolio showcase
* Blog management system
* Responsive design for desktop, tablet, and mobile
* Project gallery
* Skills and technology display
* Blog categories and tags
* Search and filtering functionality
* SEO-friendly structure
* Modern UI/UX design
* Admin dashboard for content management

## 🚀 Demo

Live Demo: https://leewithcode.vercel.app

## 📸 Screenshots

### ERD

![ERD](https://github.com/user-attachments/assets/d1ff8e12-9863-4d51-b2c1-a75687f3a70d)

### Home Page

![Home Page](https://github.com/user-attachments/assets/6e48d041-8117-49ae-abcc-cfb3b2135b09)

### Project Section

![Projects](https://github.com/user-attachments/assets/9a0da472-061f-4a2d-bc0f-253fc2efd810)

### Blog Section

![Blog - Coming soon]

### Resume

![Resume](https://github.com/user-attachments/assets/447b88e2-b69f-4b63-baf2-b1173d6e2026)

### About

![About](https://github.com/user-attachments/assets/399a96c8-9a64-4ec5-8da6-fd66ac861dab)

### Register / Login

![Register](https://github.com/user-attachments/assets/ebd0c522-5d60-4491-a4ea-62ed786e1653)

![Login](https://github.com/user-attachments/assets/36e5141f-4d3e-4ba7-aa18-ff6e831769f5)

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* Tailwind CSS

### Backend

* Spring Boot
* RestfulAPI

### Database

* PostgreSQL

## 📂 Project Structure

```bash
my-fullstack-app/
├── .github/                      
│   └── workflows/
│       └── deploy.yml
├── backend/                     
│   ├── .mvn/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/myapp/
│   │   │   │   ├── config/       # Cấu hình Cors, Security, Database
│   │   │   │   ├── controller/   # Lớp tiếp nhận API Request (REST Controllers)
│   │   │   │   ├── dto/          # Data Transfer Object (Dữ liệu gửi/nhận từ Client)
│   │   │   │   ├── exception/    # Xử lý lỗi tập trung (Global Exception Handler)
│   │   │   │   ├── model/        # Các thực thể Entity ánh xạ xuống PostgreSQL
│   │   │   │   ├── repository/   # Lớp giao tiếp DB (Spring Data JPA)
│   │   │   │   ├── service/      # Nơi xử lý logic nghiệp vụ chính (Business Logic)
│   │   │   │   └── Application.java
│   │   │   └── resources/
│   │   │       ├── application.properties / application.yml # Cấu hình DB, Port...
│   │   │       └── db/migration/ # Chứa các file SQL Migration (nếu dùng Flyway/Liquibase)
│   │   └── test/                 # Code Unit Test / Integration Test
│   ├── .gitignore                # Gitignore riêng cho Java/Spring
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml                   # Quản lý dependencies của Maven
├── frontend/                     # --- FOLDER FRONTEND (REACTJS) ---
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Hình ảnh, icons, fonts dùng chung
│   │   ├── components/           # UI Components nhỏ tái sử dụng (Button, Navbar, Modal...)
│   │   ├── context/              # Quản lý Global State (ví dụ: AuthContext)
│   │   ├── hooks/                # Custom React Hooks
│   │   ├── pages/                # Các trang chính của app (Home, Login, Dashboard...)
│   │   ├── services/             # Nơi gọi API bằng Axios hoặc Fetch (giao tiếp với Spring)
│   │   ├── utils/                # Các hàm helper, format ngày tháng, tiền tệ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                      # Lưu biến môi trường (URL của Backend API)
│   ├── .gitignore                # Gitignore riêng cho Node/React
│   ├── package.json
│   └── vite.config.js / webpack.config.js
├── docker-compose.yml            # Khởi tạo nhanh PostgreSQL và App bằng Docker (Nên có)
├── .gitignore                    # Gitignore tổng (chủ yếu ignore các file IDE như .idea, .vscode)
└── README.md                     # Hướng dẫn chạy dự án (Rất quan trọng trên GitHub)
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/toandev2505/portfolio-blog-system.git
```

### Navigate to project directory

```bash
cd portfolio-blog-system
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm start
```

The application will run at:

```bash
http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 📖 Usage

1. Open the application in your browser.
2. Explore portfolio projects.
3. Read blog articles.
4. Manage content through the admin dashboard.
5. Update projects and posts dynamically.
6. User authentication

## 🎯 Future Improvements

* Dark mode
* Comment system
* Rich text editor
* Analytics dashboard
* Multi-language support
* Image optimization

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Toan Truong**

* GitHub: https://github.com/toandev2505
* Portfolio: https://leewithcode.vercel.app/

---

⭐ If you like this project, please give it a star on GitHub.
