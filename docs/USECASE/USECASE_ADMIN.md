![IMG_256](https://github.com/user-attachments/assets/14000418-a0b9-4d8d-b671-266cfe4fe126)

**NGUỒN: [SƠ ĐỒ USECASE - ADMIN \[PORTFOLIO\]](https://shorturl.fm/05ivB)**

**Code**

@startuml

!theme plain

skinparam packageStyle rectangle

' Ép sơ đồ chạy theo chiều dọc

top to bottom direction

actor "Quản trị viên (Admin)" as Admin

rectangle "Hệ thống Portfolio & Blog (Phân hệ Admin)" {

package "Quản trị Hệ thống" {

usecase "Đăng nhập / Đăng xuất" as UC\_Auth

usecase "Đổi mật khẩu & Cập nhật Avatar" as UC\_Account

usecase "Quản lý tài khoản người dùng" as UC\_ManageUsers

}

package "Quản lý Hồ sơ" {

usecase "Cập nhật thông tin cá nhân & CV" as UC\_ManageProfile

}

package "Quản lý Dự án" {

usecase "Quản lý dự án" as UC\_ManageProjects

}

package "Quản lý Blog" {

usecase "Quản lý bài viết" as UC\_ManageBlogs

usecase "Quản lý Danh mục & Thẻ" as UC\_ManageMeta

}

package "Quản lý Tương tác" {

usecase "Duyệt & Xóa bình luận" as UC\_ModerateComment

usecase "Trả lời bình luận với tư cách Admin" as UC\_AdminComment

}

}

' Admin đứng trên cùng chỉ xuống

Admin -down-> UC\_Auth

Admin -down-> UC\_Account

Admin -down-> UC\_ManageUsers

Admin -down-> UC\_ManageProfile

Admin -down-> UC\_ManageProjects

Admin -down-> UC\_ManageBlogs

Admin -down-> UC\_ManageMeta

Admin -down-> UC\_ModerateComment

Admin -down-> UC\_AdminComment

@enduml
