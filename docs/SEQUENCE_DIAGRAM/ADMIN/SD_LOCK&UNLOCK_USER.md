![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - LOCK / UNLOCK USER \[PORTFOLIO\]](https://shorturl.at/Ufg48)**

**Code**

@startuml

autonumber

title Sequence Diagram - Toggle User Account Status

actor Admin

participant Frontend

participant JwtFilter

participant UserController

participant UserService

participant NotificationService

participant NotificationRepository

participant UserRepository

participant Database

Admin -> Frontend : Toggle User Status

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> Admin : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated Admin

Frontend -> UserController : PUT /api/v1/admin/users/{id}/status

UserController -> UserService : toggleStatus(id)

UserService -> UserRepository : findById(id)

UserRepository -> Database : SELECT user

Database --> UserRepository : user data

UserRepository --> UserService : user

alt User Not Found

UserService --> UserController : 404 Not Found

UserController --> Frontend : error response

else User Exists

alt Current Status = 1

UserService -> UserRepository : UPDATE status = 0

UserRepository -> Database : UPDATE user

Database --> UserRepository : success

UserRepository --> UserService : locked

UserService -> NotificationService : createNotification(account locked)

else Current Status = 0

UserService -> UserRepository : UPDATE status = 1

UserRepository -> Database : UPDATE user

Database --> UserRepository : success

UserRepository --> UserService : unlocked

UserService -> NotificationService : createNotification(account unlocked)

end

NotificationService -> NotificationRepository : save(notification)

NotificationRepository -> Database : INSERT notification

Database --> NotificationRepository : success

NotificationRepository --> NotificationService : created

NotificationService --> UserService : notification created

UserService --> UserController : success

UserController --> Frontend : status updated

end

end

@enduml