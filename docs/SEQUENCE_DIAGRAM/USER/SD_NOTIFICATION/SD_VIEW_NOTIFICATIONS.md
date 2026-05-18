![IMG_256](https://github.com/user-attachments/assets/726f7e16-63e2-4cec-9efc-6fc718ed2254)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW NOTIFICATIONS \[PORTFOLIO\]](https://shorturl.at/dzsTk)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Notifications

actor User

participant Frontend

participant JwtFilter

participant NotificationController

participant NotificationService

participant NotificationRepository

participant Database

User -> Frontend : View Notifications

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated User

Frontend -> NotificationController : GET /api/v1/user/notifications

NotificationController -> NotificationService : getNotifications()

NotificationService -> JwtFilter : getCurrentUser()

JwtFilter --> NotificationService : user info

NotificationService -> NotificationRepository : findByUserId(userId)

NotificationRepository -> Database : SELECT notifications

Database --> NotificationRepository : notification data

NotificationRepository --> NotificationService : notifications

NotificationService --> NotificationController : notifications

NotificationController --> Frontend : notifications response

Frontend --> User : Display Notifications

end

@enduml
