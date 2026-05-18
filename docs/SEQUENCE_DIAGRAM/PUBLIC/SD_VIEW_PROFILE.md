![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW PROFILE \[PORTFOLIO\]](https://shorturl.at/cJKp7)**

**Code**

@startuml

title Sequence Diagram - View Public Profile

actor Guest

participant Frontend

participant PublicProfileController

participant ProfileService

participant ProfileRepository

database Database

Guest -> Frontend : View Portfolio

Frontend -> PublicProfileController : GET /api/v1/public/profile

PublicProfileController -> ProfileService : getProfile()

ProfileService -> ProfileRepository : findProfile()

ProfileRepository -> Database : SELECT profile

Database --> ProfileRepository : profile data

ProfileRepository --> ProfileService : profile

ProfileService --> PublicProfileController : profile response

PublicProfileController --> Frontend : profile data

@enduml