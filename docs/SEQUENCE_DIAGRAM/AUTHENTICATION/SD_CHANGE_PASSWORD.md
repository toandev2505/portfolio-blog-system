![IMG_256](https://github.com/user-attachments/assets/9a54511f-c57f-4b94-8f21-42fea9d79f12)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - CHANGE PASSWORD \[PORTFOLIO\]](https://shorturl.at/WVbc1)**

**Code**

@startuml

title Sequence Diagram - Change Password By OTP

actor User

participant Frontend

participant AuthController

participant OTPService

participant UserService

participant UserRepository

database Database

User -> Frontend : nhập email + otp + new password

Frontend -> AuthController : PUT /api/v1/user/auth/change-password

AuthController -> OTPService : verifyOTP(email,otp)

OTPService -> Database : SELECT otp\_code

Database --> OTPService : otp\_data

alt OTP hợp lệ

OTPService --> AuthController : valid

AuthController -> UserService : updatePassword()

UserService -> UserRepository : updatePassword()

UserRepository -> Database : UPDATE password

Database --> UserRepository : success

UserRepository --> UserService : done

UserService --> AuthController : success

AuthController --> Frontend : Password Changed

else OTP không hợp lệ

OTPService --> AuthController : invalid

AuthController --> Frontend : Invalid OTP

end

@enduml
