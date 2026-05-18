![IMG_256](https://github.com/user-attachments/assets/c2226a14-0f08-40cb-bc50-b2a15a941694)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - ADD POST \[PORTFOLIO\]](https://shorturl.at/A3q90)**

**Code**

@startuml

autonumber

title Sequence Diagram - Create Blog Post

actor User

participant Frontend

participant JwtFilter

participant BlogController

participant BlogService

participant CloudStorageService

participant CategoryRepository

participant TagRepository

participant BlogRepository

participant Database

User -> Frontend : Write Blog Post

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> BlogController : POST /api/v1/user/posts

BlogController -> BlogService : createPost()

alt Has Thumbnail

BlogService -> CloudStorageService : uploadImage()

CloudStorageService --> BlogService : imageUrl

end

BlogService -> CategoryRepository : validateCategory()

CategoryRepository -> Database : SELECT category

Database --> CategoryRepository : category data

CategoryRepository --> BlogService : category

BlogService -> TagRepository : validateTags()

TagRepository -> Database : SELECT tags

Database --> TagRepository : tags data

TagRepository --> BlogService : tags

BlogService -> BlogRepository : save(post)

BlogRepository -> Database : INSERT post

Database --> BlogRepository : success

BlogRepository --> BlogService : created post

BlogService --> BlogController : success

BlogController --> Frontend : post created

end

@enduml
