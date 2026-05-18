![IMG_256](https://github.com/user-attachments/assets/203f03df-c528-44d3-8b09-a3b8872506ea)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - LOGOUT \[PORTFOLIO\]](https://shorturl.at/COk9T)**

**Code**

@startuml

autonumber

title Sequence Diagram - Logout

actor User

participant Frontend

participant JwtFilter

participant AuthController

participant AuthService

participant RefreshTokenRepository

participant Database

User -> Frontend : Click Logout

Frontend -> JwtFilter : Validate Access Token

alt Token Invalid

JwtFilter --> Frontend : 401 Unauthorized

else Token Valid

JwtFilter --> Frontend : Authenticated

Frontend -> AuthController : POST /api/v1/auth/logout

AuthController -> AuthService : logout(refreshToken)

AuthService -> RefreshTokenRepository : deleteByToken()

RefreshTokenRepository -> Database : DELETE refresh token

Database --> RefreshTokenRepository : success

RefreshTokenRepository --> AuthService : deleted

AuthService --> AuthController : logout success

AuthController --> Frontend : success response

end

@enduml
