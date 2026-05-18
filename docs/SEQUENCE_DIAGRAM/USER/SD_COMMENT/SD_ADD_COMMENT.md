![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - ADD COMMENT \[PORTFOLIO\]](https://shorturl.fm/oFs0Q)**

**Code**

@startuml

autonumber

title Sequence Diagram - Add Comment

actor User

participant Frontend

participant JwtFilter

participant CommentController

participant CommentService

participant CommentRepository

participant Database

User -> Frontend : Enter Comment

Frontend -> JwtFilter : Validate JWT

alt Not Logged In

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authenticated

JwtFilter --> Frontend : Authenticated User

Frontend -> CommentController : POST /api/v1/user/comments

CommentController -> CommentService : addComment()

CommentService -> JwtFilter : getCurrentUser()

JwtFilter --> CommentService : user info

alt Has Parent Comment

CommentService -> CommentRepository : findById(parentId)

CommentRepository -> Database : SELECT parent comment

Database --> CommentRepository : parent comment data

CommentRepository --> CommentService : parent comment

alt Parent Comment Not Found

CommentService --> CommentController : 404 Parent Comment Not Found

CommentController --> Frontend : error response

else Parent Comment Exists

CommentService -> CommentRepository : save(comment status = DRAFT)

CommentRepository -> Database : INSERT reply comment

Database --> CommentRepository : success

CommentRepository --> CommentService : created

CommentService --> CommentController : success

CommentController --> Frontend : reply created waiting approval

end

else Root Comment

CommentService -> CommentRepository : save(comment status = DRAFT)

CommentRepository -> Database : INSERT root comment

Database --> CommentRepository : success

CommentRepository --> CommentService : created

CommentService --> CommentController : success

CommentController --> Frontend : comment created waiting approval

end

end

@enduml