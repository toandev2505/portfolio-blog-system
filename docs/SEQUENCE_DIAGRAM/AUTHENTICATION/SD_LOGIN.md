![IMG_256](https://github.com/user-attachments/assets/26ccd3c1-c5bc-483a-92c8-0f418d8e5ea1)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - LOGIN \[PORTFOLIO\]](https://shorturl.at/GmOqT)**

**Code**

@startuml

title LOGIN - Username hoặc Email

actor User

participant Frontend

participant AuthController

participant AuthService

participant UserRepository

database Database

participant JWTService

User -> Frontend : Nhập username/email + password

Frontend -> AuthController : POST /api/v1/user/auth/login

AuthController -> AuthService : login(account,password)

AuthService -> UserRepository : findByUsernameOrEmail(account)

UserRepository -> Database : SELECT \* FROM users

Database --> UserRepository : User Data

UserRepository --> AuthService : User

AuthService -> AuthService : verifyPassword()

alt Login Success

AuthService -> JWTService : generateAccessToken()

JWTService --> AuthService : JWT Token

AuthService --> AuthController : Login Success

AuthController --> Frontend : accessToken + userInfo

else Login Failed

AuthService --> AuthController : Invalid Credential

AuthController --> Frontend : Error Message

end

@enduml
