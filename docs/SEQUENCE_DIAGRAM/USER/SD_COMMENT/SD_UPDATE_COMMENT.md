![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE COMMENT \[PORTFOLIO\]](https://shorturl.fm/LrQWQ)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update Comment

actor User

participant Frontend

participant JwtFilter

participant CommentController

participant CommentService

participant CommentRepository

participant Database

User -> Frontend : Edit Comment

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> CommentController : PUT /api/v1/user/comments/{id}

CommentController -> CommentService : updateComment(id)

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

CommentService -> CommentRepository : UPDATE comment

CommentRepository -> Database : UPDATE comment

Database --> CommentRepository : success

CommentRepository --> CommentService : updated

CommentService --> CommentController : success

CommentController --> Frontend : comment updated

end

end

end

@enduml