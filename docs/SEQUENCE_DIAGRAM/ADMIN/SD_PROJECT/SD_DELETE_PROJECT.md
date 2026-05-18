![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DELETE PROJECT \[PORTFOLIO\]](https://shorturl.at/T0tAj)**

**Code**

@startuml

autonumber

title Sequence Diagram - Delete Project

actor User

participant Frontend

participant JwtFilter

participant ProjectController

participant ProjectService

participant ProjectRepository

participant Database

User -> Frontend : Delete Project

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> ProjectController : DELETE /api/v1/user/projects/{id}

ProjectController -> ProjectService : deleteProject(id)

ProjectService -> ProjectRepository : findById(id)

ProjectRepository -> Database : SELECT project

Database --> ProjectRepository : project data

ProjectRepository --> ProjectService : project

alt Project Not Found

ProjectService --> ProjectController : 404 Not Found

else Project Exists

ProjectService -> ProjectRepository : DELETE project

ProjectRepository -> Database : DELETE project

Database --> ProjectRepository : success

ProjectRepository --> ProjectService : deleted

ProjectService --> ProjectController : success

end

ProjectController --> Frontend : response

end

@enduml