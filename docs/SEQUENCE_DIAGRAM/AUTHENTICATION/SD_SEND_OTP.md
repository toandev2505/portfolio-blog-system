![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - SEND OTP \[PORTFOLIO\]](https://shorturl.fm/dZHD1)**

**Code**

@startuml

autonumber

title Sequence Diagram - Send Reset OTP

actor User

participant Frontend

participant AuthController

participant AuthService

participant UserRepository

participant OTPService

participant EmailService

participant Database

User -> Frontend : Enter Email

Frontend -> AuthController : POST /api/v1/auth/send-reset-otp

AuthController -> AuthService : sendResetOTP(email)

AuthService -> UserRepository : findByEmail(email)

UserRepository -> Database : SELECT user

Database --> UserRepository : user data

UserRepository --> AuthService : user

alt Email Not Found

AuthService --> AuthController : Email Not Found

AuthController --> Frontend : Error Response

else Email Exists

AuthService -> OTPService : generateOTP()

OTPService -> Database : Save OTP

AuthService -> EmailService : Send OTP Email

EmailService --> User : OTP Email

AuthService --> AuthController : OTP Sent

AuthController --> Frontend : Success Response

end

@enduml