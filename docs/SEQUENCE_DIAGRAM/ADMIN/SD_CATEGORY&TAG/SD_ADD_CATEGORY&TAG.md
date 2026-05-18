![IMG_256](https://github.com/user-attachments/assets/d3282ee7-d450-4df8-8026-92d1fd0267cd)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - ADD CATEGORY & TAG \[PORTFOLIO\]](https://shorturl.fm/DFdcy)**

**Code**

@startuml

autonumber

title Sequence Diagram - Create Category & Tag

actor User

participant Frontend

participant JwtFilter

participant CategoryController

participant CategoryService

participant CategoryRepository

participant Database

User -> Frontend : Enter Category Information

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> CategoryController : POST /api/v1/user/categories(tags)

CategoryController -> CategoryService : createCategory()

CategoryService -> CategoryRepository : findByName(name)

CategoryRepository -> Database : SELECT category

Database --> CategoryRepository : category data

CategoryRepository --> CategoryService : category

alt Category Already Exists

CategoryService --> CategoryController : 409 Conflict

CategoryController --> Frontend : error response

else Category Not Exists

CategoryService -> CategoryRepository : save(category)

CategoryRepository -> Database : INSERT category

Database --> CategoryRepository : success

CategoryRepository --> CategoryService : created

CategoryService --> CategoryController : success

CategoryController --> Frontend : category created

end

end

@enduml
