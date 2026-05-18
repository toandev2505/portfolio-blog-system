![IMG_256](https://github.com/user-attachments/assets/cb1789ef-a987-4241-b20f-e750a52fb9d1)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - REGISTER \[PORTFOLIO\]](https://shorturl.at/wj2pB)**

**Code**

@startuml

title Sequence Diagram - Register

actor User

participant Frontend

participant AuthController

participant AuthService

participant UserRepository

database Database

User -> Frontend : Nhập thông tin đăng ký

Frontend -> AuthController : POST /api/v1/user/auth/register

AuthController -> AuthService : register(data)

AuthService -> UserRepository : existsByEmail()

UserRepository -> Database : SELECT email

Database --> UserRepository : result

alt Email tồn tại

UserRepository --> AuthService : true

AuthService --> AuthController : Email existed

AuthController --> Frontend : Error

else Email chưa tồn tại

UserRepository --> AuthService : false

AuthService -> AuthService : hashPassword()

AuthService -> UserRepository : save(user)

UserRepository -> Database : INSERT user

Database --> UserRepository : success

UserRepository --> AuthService : created

AuthService --> AuthController : register success

AuthController --> Frontend : success response

end

@enduml
