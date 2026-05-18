![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DELETE POST \[PORTFOLIO\]](https://shorturl.fm/1UBA5)**

**Code**

@startuml

autonumber

title Sequence Diagram - Delete Blog Post

actor User

participant Frontend

participant JwtFilter

participant BlogController

participant BlogService

participant BlogRepository

participant Database

User -> Frontend : Delete Blog Post

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> BlogController : DELETE /api/v1/user/posts/{id}

BlogController -> BlogService : deletePost()

BlogService -> BlogRepository : findById(id)

BlogRepository -> Database : SELECT post

Database --> BlogRepository : post data

BlogRepository --> BlogService : post

alt Post Not Found

BlogService --> BlogController : 404 Not Found

else Post Exists

BlogService -> BlogRepository : DELETE post

BlogRepository -> Database : DELETE post

Database --> BlogRepository : success

BlogRepository --> BlogService : deleted

BlogService --> BlogController : success

end

BlogController --> Frontend : response

end

@enduml