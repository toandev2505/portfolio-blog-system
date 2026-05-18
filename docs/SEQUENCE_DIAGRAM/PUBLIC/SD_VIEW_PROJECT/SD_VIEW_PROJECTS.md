![IMG_256](https://github.com/user-attachments/assets/f8f0a883-abb1-4fd6-8c42-7475ae363afb)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW PROJECT \[PORTFOLIO\]](https://shorturl.at/QSWCA)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Public Projects

actor Guest

participant Frontend

participant PublicProjectController

participant ProjectService

participant ProjectRepository

participant Database

Guest -> Frontend : Open Projects Page

Frontend -> PublicProjectController : GET /api/v1/public/projects

PublicProjectController -> ProjectService : getPublicProjects()

ProjectService -> ProjectRepository : findPublicProjects()

ProjectRepository -> Database : SELECT projects

Database --> ProjectRepository : project list

ProjectRepository --> ProjectService : projects

ProjectService --> PublicProjectController : project response

PublicProjectController --> Frontend : projects data

@enduml
