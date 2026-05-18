![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - APPROVE COMMENT \[PORTFOLIO\]](https://shorturl.at/reXaC)**

**Code**

@startuml

autonumber

title Sequence Diagram - Approve Comment

actor Admin

participant Frontend

participant JwtFilter

participant CommentController

participant CommentService

participant NotificationService

participant NotificationRepository

participant CommentRepository

participant Database

Admin -> Frontend : Approve Comment

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> Admin : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated Admin

Frontend -> CommentController : PUT /api/v1/admin/comments/{id}/approve

CommentController -> CommentService : approveComment(id)

CommentService -> CommentRepository : findById(id)

CommentRepository -> Database : SELECT comment

Database --> CommentRepository : comment data

CommentRepository --> CommentService : comment

alt Comment Not Found

CommentService --> CommentController : 404 Not Found

CommentController --> Frontend : error response

else Comment Exists

CommentService -> CommentRepository : UPDATE status = ARCHIVED

CommentRepository -> Database : UPDATE comment

Database --> CommentRepository : success

CommentRepository --> CommentService : updated

CommentService -> NotificationService : createNotification()

NotificationService -> NotificationRepository : save(notification)

NotificationRepository -> Database : INSERT notification

Database --> NotificationRepository : success

NotificationRepository --> NotificationService : created

NotificationService --> CommentService : notification created

CommentService --> CommentController : success

CommentController --> Frontend : comment approved

end

end

@enduml