![IMG_256](https://github.com/user-attachments/assets/c2c9567f-3c92-4a79-8b7c-ea4b3450c28f)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW BLOG DETAIL \[PORTFOLIO\]](https://shorturl.fm/Q3yel)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Post Detail

actor User

participant Frontend

participant PostController

participant PostService

participant PostRepository

participant CommentRepository

participant TagRepository

participant Database

User -> Frontend : View Post Detail

Frontend -> PostController : GET /api/v1/public/posts/{slug}

PostController -> PostService : getPostBySlug(slug)

PostService -> PostRepository : findBySlug(slug)

PostRepository -> Database : SELECT post

Database --> PostRepository : post data

PostRepository --> PostService : post

alt Post Not Found

PostService --> PostController : 404 Not Found

PostController --> Frontend : error response

else Post Exists

PostService -> CommentRepository : findByPostId(postId)

CommentRepository -> Database : SELECT comments

Database --> CommentRepository : comments data

CommentRepository --> PostService : comments

PostService -> TagRepository : findTagsByPostId(postId)

TagRepository -> Database : SELECT tags

Database --> TagRepository : tags data

TagRepository --> PostService : tags

PostService --> PostController : post detail + comments + tags

PostController --> Frontend : post data + comments + tags

Frontend --> User : Display Post Detail

end

@enduml
