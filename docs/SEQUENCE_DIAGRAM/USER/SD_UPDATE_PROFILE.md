![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE PROFILE \[PORTFOLIO\]](https://shorturl.fm/gXBk2)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update User Profile

actor User

participant Frontend

participant JwtFilter

participant ProfileController

participant ProfileService

participant PersonalDetailRepository

participant Database

User -> Frontend : Update Personal Information

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated User

Frontend -> ProfileController : PUT /api/v1/user/profile

ProfileController -> ProfileService : updateProfile()

ProfileService -> JwtFilter : getCurrentUser()

JwtFilter --> ProfileService : user info

ProfileService -> PersonalDetailRepository : findByUserId(userId)

PersonalDetailRepository -> Database : SELECT personal detail

Database --> PersonalDetailRepository : profile data

PersonalDetailRepository --> ProfileService : profile

alt Profile Not Found

ProfileService --> ProfileController : 404 Not Found

ProfileController --> Frontend : error response

else Profile Exists

ProfileService -> PersonalDetailRepository : UPDATE personal detail

PersonalDetailRepository -> Database : UPDATE profile

Database --> PersonalDetailRepository : success

PersonalDetailRepository --> ProfileService : updated

ProfileService --> ProfileController : success

ProfileController --> Frontend : profile updated

end

end

@enduml