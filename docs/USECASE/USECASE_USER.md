![IMG_256](https://github.com/user-attachments/assets/31557959-32c0-4f66-8116-d3c6bc30fe03)

**NGUỒN: [SƠ ĐỒ USECASE - USER \[PORTFOLIO\]](https://shorturl.at/L9vHI)**

**Code**

@startuml

!theme plain

skinparam packageStyle rectangle

' Ép toàn bộ sơ đồ chạy theo chiều dọc từ trên xuống

top to bottom direction

actor "Thành viên (User/Member)" as User

rectangle "Hệ thống Portfolio & Blog (Giao diện Thành viên)" {

package "Tài khoản & Xác thực" {

usecase "Đăng ký / Đăng nhập / Đăng xuất" as UC\_UserAuth

usecase "Cập nhật thông tin & Avatar" as UC\_UserAccount

}

package "Xem Hồ sơ" {

usecase "Xem thông tin hồ sơ & Tải CV" as UC\_ViewProfile

}

package "Xem Dự án" {

usecase "Xem danh sách & Lọc dự án theo công nghệ" as UC\_ViewProjects

}

package "Đọc Blog & Tương tác" {

usecase "Xem & Tìm kiếm bài viết" as UC\_ViewBlogs

usecase "Gửi & Trả lời bình luận" as UC\_Comment

}

}

' Thể hiện mối quan hệ bắt buộc (include): Muốn bình luận thì phải qua luồng Đăng nhập

UC\_Comment .down.> UC\_UserAuth : <<include>>

' Đường liên kết User đứng trên chỉ xuống

User -down-> UC\_UserAuth

User -down-> UC\_UserAccount

User -down-> UC\_ViewProfile

User -down-> UC\_ViewProjects

User -down-> UC\_ViewBlogs

User -down-> UC\_Comment

@enduml
