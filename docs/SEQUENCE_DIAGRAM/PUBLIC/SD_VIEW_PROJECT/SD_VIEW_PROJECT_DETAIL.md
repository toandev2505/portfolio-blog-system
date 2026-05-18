![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW PROJECT DETAIL \[PORTFOLIO\]](https://shorturl.fm/J5oxN)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Project Detail

actor User

participant Frontend

participant ProjectController

participant ProjectService

participant ProjectRepository

participant Database

User -> Frontend : View Project Detail

Frontend -> ProjectController : GET /api/v1/public/projects/{id}

ProjectController -> ProjectService : getProjectDetail(id)

ProjectService -> ProjectRepository : findById(id)

ProjectRepository -> Database : SELECT project

Database --> ProjectRepository : project data

ProjectRepository --> ProjectService : project

alt Project Not Found

ProjectService --> ProjectController : 404 Not Found

ProjectController --> Frontend : error response

else Project Exists

ProjectService --> ProjectController : project detail

ProjectController --> Frontend : project data

Frontend --> User : Display Project Detail

end

@enduml