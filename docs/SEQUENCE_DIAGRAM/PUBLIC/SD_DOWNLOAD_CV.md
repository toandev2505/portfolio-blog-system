![IMG_256](https://github.com/user-attachments/assets/f5709391-8b1f-4782-b131-1cee0c24def3)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DOWNLOAD CV \[PORTFOLIO\]](https://shorturl.fm/wKIjQ)**

**Code**

@startuml

autonumber

title Sequence Diagram - Download CV

actor User

participant Frontend

participant ProfileController

participant ProfileService

participant PersonalDetailRepository

participant Database

User -> Frontend : Click Download CV

Frontend -> ProfileController : GET /api/v1/public/profile/cv

ProfileController -> ProfileService : downloadCV()

ProfileService -> PersonalDetailRepository : findCVLink()

PersonalDetailRepository -> Database : SELECT cv link

Database --> PersonalDetailRepository : cv data

PersonalDetailRepository --> ProfileService : cv link

alt CV Not Found

ProfileService --> ProfileController : 404 CV Not Found

ProfileController --> Frontend : error response

else CV Exists

ProfileService --> ProfileController : cv url

ProfileController --> Frontend : download response

Frontend --> User : Download CV

end

@enduml
