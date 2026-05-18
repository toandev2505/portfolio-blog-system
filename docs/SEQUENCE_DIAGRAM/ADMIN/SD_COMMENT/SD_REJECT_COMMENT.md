![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - REJECT COMMENT \[PORTFOLIO\]](https://shorturl.at/qRnBA)**

**Code**

@startuml

autonumber

title Sequence Diagram - Reject Comment List

actor Admin

participant Frontend

participant JwtFilter

participant CommentController

participant CommentService

participant NotificationService

participant NotificationRepository

participant CommentRepository

participant Database

Admin -> Frontend : Select Comments To Reject

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> Admin : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated Admin

Frontend -> CommentController : DELETE /api/v1/admin/comments

CommentController -> CommentService : rejectComments(commentIds)

loop For Each Comment Id

CommentService -> CommentRepository : findById(id)

CommentRepository -> Database : SELECT comment

Database --> CommentRepository : comment data

CommentRepository --> CommentService : comment

alt Comment Not Found

CommentService --> CommentController : 404 Not Found

else Comment Exists

CommentService -> CommentRepository : UPDATE status = REJECTED

CommentRepository -> Database : UPDATE comment

Database --> CommentRepository : success

CommentRepository --> CommentService : updated

CommentService -> NotificationService : createNotification()

NotificationService -> NotificationRepository : save(notification)

NotificationRepository -> Database : INSERT notification

Database --> NotificationRepository : success

NotificationRepository --> NotificationService : created

NotificationService --> CommentService : notification created

end

end

CommentService --> CommentController : reject success

CommentController --> Frontend : comments rejected

end

@enduml