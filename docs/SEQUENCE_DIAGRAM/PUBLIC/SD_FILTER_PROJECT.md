![IMG_256](https://github.com/user-attachments/assets/ce04ed43-68c0-4c26-a21e-437e1a972bba)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - FILTER PROJECT BY TECHNOLOGIES \[PORTFOLIO\]](https://shorturl.fm/T6mnV)**

**Code**

@startuml

autonumber

title Sequence Diagram - Filter Projects By Technology

actor User

participant Frontend

participant ProjectController

participant ProjectService

participant ProjectRepository

participant Database

User -> Frontend : Select Technology Filter

Frontend -> ProjectController : GET /api/v1/public/projects/filter?technology=react

ProjectController -> ProjectService : filterProjects(technology)

ProjectService -> ProjectRepository : findByTechnology(technology)

ProjectRepository -> Database : SELECT projects

Database --> ProjectRepository : project list

ProjectRepository --> ProjectService : filtered projects

alt No Projects Found

ProjectService --> ProjectController : empty list

ProjectController --> Frontend : no projects found

Frontend --> User : Display Empty Result

else Projects Found

ProjectService --> ProjectController : projects

ProjectController --> Frontend : filtered projects

Frontend --> User : Display Projects

end

@enduml
