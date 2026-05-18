![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - SEARCH POST \[PORTFOLIO\]](https://shorturl.fm/mEQ09)**

**Code**

@startuml

autonumber

title Sequence Diagram - Search Posts

actor User

participant Frontend

participant PostController

participant PostService

participant PostRepository

participant Database

User -> Frontend : Enter Keyword

Frontend -> PostController : GET /api/v1/public/posts/search?keyword=spring

PostController -> PostService : searchPosts(keyword)

PostService -> PostRepository : searchByKeyword(keyword)

PostRepository -> Database : SELECT posts

Database --> PostRepository : search result

PostRepository --> PostService : matched posts

alt No Posts Found

PostService --> PostController : empty list

PostController --> Frontend : no posts found

Frontend --> User : Display Empty Result

else Posts Found

PostService --> PostController : posts

PostController --> Frontend : search result

Frontend --> User : Display Posts

end

@enduml