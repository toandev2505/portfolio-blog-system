![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW POSTS BY CATEGORY \[PORTFOLIO\]](https://shorturl.fm/C4fKs)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Posts By Category

actor User

participant Frontend

participant PostController

participant PostService

participant CategoryRepository

participant PostRepository

participant Database

User -> Frontend : Select Category

Frontend -> PostController : GET /api/v1/public/posts/categoryId=?

PostController -> PostService : getPostsByCategory(categoryId)

PostService -> CategoryRepository : findById(categoryId)

CategoryRepository -> Database : SELECT category

Database --> CategoryRepository : category data

CategoryRepository --> PostService : category

alt Category Not Found

PostService --> PostController : 404 Not Found

PostController --> Frontend : error response

else Category Exists

PostService -> PostRepository : findByCategoryId(categoryId)

PostRepository -> Database : SELECT posts

Database --> PostRepository : posts data

PostRepository --> PostService : posts

alt No Posts Found

PostService --> PostController : empty list

PostController --> Frontend : no posts found

Frontend --> User : Display Empty Result

else Posts Found

PostService --> PostController : posts

PostController --> Frontend : posts data

Frontend --> User : Display Posts

end

end

@enduml