![IMG_256](https://github.com/user-attachments/assets/eb6f6de2-edb0-4d79-9e9a-1823d3383d54)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DELETE COMMENT \[PORTFOLIO\]](https://shorturl.fm/nj2lB)**

**Code**

@startuml

autonumber

title Sequence Diagram - Delete Comment

actor User

participant Frontend

participant JwtFilter

participant CommentController

participant CommentService

participant CommentRepository

participant Database

User -> Frontend : Delete Comment

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> CommentController : DELETE /api/v1/user/comments/{id}

CommentController -> CommentService : deleteComment(id)

CommentService -> CommentRepository : findById(id)

CommentRepository -> Database : SELECT comment

Database --> CommentRepository : comment data

CommentRepository --> CommentService : comment

alt Comment Not Found

CommentService --> CommentController : 404 Not Found

CommentController --> Frontend : error response

else Comment Exists

alt Comment Does Not Belong To User

CommentService --> CommentController : 403 Forbidden

CommentController --> Frontend : permission denied

else Comment Belongs To User

CommentService -> CommentRepository : DELETE child comments by parentId

CommentRepository -> Database : DELETE child comments

Database --> CommentRepository : success

CommentRepository --> CommentService : deleted children

CommentService -> CommentRepository : DELETE comment

CommentRepository -> Database : DELETE comment

Database --> CommentRepository : success

CommentRepository --> CommentService : deleted

CommentService --> CommentController : success

CommentController --> Frontend : comment deleted

end

end

end

@enduml
