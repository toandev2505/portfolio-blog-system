![IMG_256](https://github.com/user-attachments/assets/d713733c-f5c5-43e1-b136-89b703369e97)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW POST \[PORTFOLIO\]](https://shorturl.at/Uarue)**

**Code**

@startuml

title Sequence Diagram - View Post

actor Guest

participant Frontend

participant PublicPostController

participant PostService

participant PostRepository

database Database

Guest -> Frontend : View Post

Frontend -> PublicPostController : GET /api/v1/public/posts/{slug}

PublicPostController -> PostService : getPostBySlug(slug)

PostService -> PostRepository : findBySlug(slug)

PostRepository -> Database : SELECT post

Database --> PostRepository : post data

PostRepository --> PostService : post

PostService --> PublicPostController : post

PublicPostController --> Frontend : response

@enduml
