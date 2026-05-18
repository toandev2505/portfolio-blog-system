![IMG_256](https://github.com/user-attachments/assets/41169cfc-1cee-4f02-80bf-06ee7510fc6a)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE POST \[PORTFOLIO\]](https://shorturl.fm/A5vQB)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update Blog Post

actor User

participant Frontend

participant JwtFilter

participant BlogController

participant BlogService

participant BlogRepository

participant Database

User -> Frontend : Edit Blog Post

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> BlogController : PUT /api/v1/user/posts/{id}

BlogController -> BlogService : updatePost()

BlogService -> BlogRepository : findById(id)

BlogRepository -> Database : SELECT post

Database --> BlogRepository : post data

BlogRepository --> BlogService : post

alt Post Not Found

BlogService --> BlogController : 404 Not Found

else Post Exists

BlogService -> BlogRepository : UPDATE post

BlogRepository -> Database : UPDATE post

Database --> BlogRepository : success

BlogRepository --> BlogService : updated

BlogService --> BlogController : success

end

BlogController --> Frontend : response

end

@enduml
