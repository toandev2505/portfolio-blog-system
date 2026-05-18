![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DELETE NOTIFICATIONS \[PORTFOLIO\]](https://shorturl.at/DGvvA)**

**Code**

@startuml

autonumber

title Sequence Diagram - Delete Notification List

actor User

participant Frontend

participant JwtFilter

participant NotificationController

participant NotificationService

participant NotificationRepository

participant Database

User -> Frontend : Select Notifications To Delete

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated User

Frontend -> NotificationController : DELETE /api/v1/user/notifications

NotificationController -> NotificationService : deleteNotifications(ids)

loop For Each Notification Id

NotificationService -> NotificationRepository : findById(id)

NotificationRepository -> Database : SELECT notification

Database --> NotificationRepository : notification data

NotificationRepository --> NotificationService : notification

alt Notification Not Found

NotificationService --> NotificationController : 404 Not Found

else Notification Exists

NotificationService -> NotificationRepository : DELETE notification

NotificationRepository -> Database : DELETE notification

Database --> NotificationRepository : success

NotificationRepository --> NotificationService : deleted

end

end

NotificationService --> NotificationController : delete success

NotificationController --> Frontend : notifications deleted

end

@enduml