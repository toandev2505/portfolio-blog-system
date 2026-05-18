![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - READ NOTIFICATION \[PORTFOLIO\]](https://shorturl.at/dzsTk)**

**Code**

@startuml

autonumber

title Sequence Diagram - Read Notification

actor User

participant Frontend

participant JwtFilter

participant NotificationController

participant NotificationService

participant NotificationRepository

participant Database

User -> Frontend : Open Notification

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated User

Frontend -> NotificationController : PUT /api/v1/user/notifications/{id}/read

NotificationController -> NotificationService : readNotification(id)

NotificationService -> NotificationRepository : findById(id)

NotificationRepository -> Database : SELECT notification

Database --> NotificationRepository : notification data

NotificationRepository --> NotificationService : notification

alt Notification Not Found

NotificationService --> NotificationController : 404 Not Found

NotificationController --> Frontend : error response

else Notification Exists

NotificationService -> NotificationRepository : UPDATE is\_read = true

NotificationRepository -> Database : UPDATE notification

Database --> NotificationRepository : success

NotificationRepository --> NotificationService : updated

NotificationService --> NotificationController : success

NotificationController --> Frontend : notification read

end

end

@enduml