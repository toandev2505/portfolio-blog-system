# THIẾT KẾ API HỆ THỐNG PORTFOLIO & BLOG

Tài liệu này mô tả thiết kế RESTful API cho hệ thống Portfolio & Blog được xây dựng bằng ReactJS + Spring Boot.

---

# 1. Quy Ước API

| Prefix | Mô tả |
|---|---|
| `/api/v1/public/*` | API công khai chỉ dùng để xem dữ liệu |
| `/api/v1/user/*` | API dành cho người dùng đã đăng nhập |
| `/api/v1/admin/*` | API dành cho quản trị viên |

---

# 2. Authentication & Authorization

- Authentication sử dụng JWT Access Token + Refresh Token
- Đăng nhập bằng username hoặc email
- Password được hash bằng BCrypt
- Đổi mật khẩu yêu cầu OTP xác thực qua email
- Role-based Authorization:
  - ADMIN
  - USER

---

# 3. Authentication Flow

## Đăng nhập

1. User nhập username/email + password
2. Server kiểm tra thông tin tài khoản
3. Nếu hợp lệ:
   - trả Access Token
   - trả Refresh Token

---

## Refresh Token

Khi Access Token hết hạn:

1. Frontend gửi Refresh Token
2. Server cấp Access Token mới
3. User không cần đăng nhập lại

---

## Đổi mật khẩu

1. User yêu cầu gửi OTP
2. OTP gửi về email
3. User nhập OTP hợp lệ
4. Cho phép đổi password

---

# 4. PUBLIC APIs

## Profile APIs

### GET /api/v1/public/profile

Xem thông tin portfolio công khai.

---

## Project APIs

### GET /api/v1/public/projects

Lấy danh sách dự án.

### GET /api/v1/public/projects/{id}

Xem chi tiết dự án.

### GET /api/v1/public/projects/filter?technology=react

Lọc dự án theo công nghệ.

---

## Blog APIs

### GET /api/v1/public/posts

Xem danh sách bài viết.

### GET /api/v1/public/posts/{slug}

Xem chi tiết bài viết.

### GET /api/v1/public/posts/categoryId=?

Xem bài viết theo danh mục.

### GET /api/v1/public/posts/search?keyword=spring

Tìm kiếm bài viết.

---

## Comment APIs

### GET /api/v1/public/comments/post/{postId}

Xem danh sách bình luận của bài viết.

Chỉ hiển thị comment có trạng thái:

```text
ARCHIVED
```

---

## Category & Tag APIs

### GET /api/v1/public/categories

Lấy danh sách category.

### GET /api/v1/public/tags

Lấy danh sách tag.

### GET /api/v1/public/tags/{postId}

Lấy danh sách tag của bài viết.

---

# 5. AUTH APIs

## POST /api/v1/auth/register

Đăng ký tài khoản.

---

## POST /api/v1/auth/login

Đăng nhập bằng username hoặc email.

---

## POST /api/v1/auth/logout

Đăng xuất tài khoản.

---

## POST /api/v1/auth/refresh-token

Cấp lại Access Token mới.

---

## POST /api/v1/auth/send-reset-otp

Gửi OTP xác thực đổi mật khẩu.

---

## PUT /api/v1/auth/change-password

Đổi mật khẩu bằng OTP.

---

# 6. USER APIs

## Profile APIs

### PUT /api/v1/user/profile

Cập nhật thông tin cá nhân.

---

## Comment APIs

### POST /api/v1/user/comments

Tạo comment mới.

Comment mặc định có trạng thái:

```text
DRAFT
```

---

### POST /api/v1/user/comments/reply/{parentId}

Trả lời comment.

---

### PUT /api/v1/user/comments/{commentId}

Cập nhật comment.

---

### DELETE /api/v1/user/comments/{commentId}

Xóa comment.

Nếu comment là root comment:

- toàn bộ comment con sẽ bị xóa cứng.

---

## Notification APIs

### GET /api/v1/user/notifications

Lấy danh sách thông báo.

---

### PUT /api/v1/user/notifications/{id}/read

Đánh dấu đã đọc thông báo.

---

### DELETE /api/v1/user/notifications

Xóa danh sách notification theo mảng ids.

Ví dụ request:

```json
{
  "ids": [1,2,3]
}
```

---

# 7. ADMIN APIs

## Profile APIs

### PUT /api/v1/admin/profile

Cập nhật:

- thông tin cá nhân
- skills
- education
- achievement
- work experience

---

## User Management APIs

### GET /api/v1/admin/users

Lấy danh sách user.

---

### PUT /api/v1/admin/users/{id}/status

Khóa / mở khóa tài khoản.

Logic:

| Current Status | New Status |
|---|---|
| 1 | 0 |
| 0 | 1 |

Khi thay đổi trạng thái:

- tạo notification
- lưu message vào database

---

## Post APIs

### GET /api/v1/admin/posts

Quản lý danh sách bài viết.

### POST /api/v1/admin/posts

Tạo bài viết.

### PUT /api/v1/admin/posts/{id}

Cập nhật bài viết.

### DELETE /api/v1/admin/posts

Xóa danh sách bài viết.

---

## Category APIs

### POST /api/v1/admin/categories

Tạo category.

---

## Tag APIs

### POST /api/v1/admin/tags

Tạo tag.

### PUT /api/v1/admin/tags/{tagId}

Cập nhật tag.

### DELETE /api/v1/admin/tags/{tagId}

Xóa tag.

---

## Comment Moderation APIs

### DELETE /api/v1/admin/comments

Từ chối danh sách comment.

Comment sẽ chuyển trạng thái:

```text
REJECTED
```

---

### PUT /api/v1/admin/comments/approve

Duyệt comment.

Comment sẽ chuyển trạng thái:

```text
ARCHIVED
```

Sau khi duyệt/từ chối:

- tạo notification
- lưu notification vào database

---

## Project APIs

### POST /api/v1/admin/projects

Tạo dự án.

### PUT /api/v1/admin/projects/{id}

Cập nhật dự án.

### DELETE /api/v1/admin/projects/{id}

Xóa dự án.

---

## CV APIs

### PUT /api/v1/admin/cv

Upload CV lên cloud storage.

Database chỉ lưu:

```text
cv_link
```

---

## Notification APIs

### POST /api/v1/admin/notification

Gửi notification đến user.

---

# 8. Security & Middleware

- JWT Authentication Middleware
- Role-based Authorization
- BCrypt Password Hashing
- OTP Expiration
- Refresh Token Rotation
- Rate Limiting cho Login API

---

# 9. Phân Quyền

| Role | Quyền |
|---|---|
| ADMIN | CRUD toàn bộ hệ thống |
| USER | CRUD dữ liệu cá nhân |
| GUEST | Chỉ xem dữ liệu công khai |

---

# 10. Kết Luận

Hệ thống API được thiết kế theo kiến trúc RESTful hiện đại, phân tách rõ:

- Public APIs
- User APIs
- Admin APIs

Thiết kế này giúp:

- dễ bảo trì
- dễ mở rộng
- tăng tính bảo mật
- phù hợp hệ thống production thực tế