![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE PROJECT \[PORTFOLIO\]](https://shorturl.fm/dIA6B)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update Project

actor User

participant Frontend

participant JwtFilter

participant ProjectController

participant ProjectService

participant ArchitectureRepository

participant CloudStorageService

participant ProjectRepository

participant Database

User -> Frontend : Edit Project

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> ProjectController : PUT /api/v1/user/projects/{id}

ProjectController -> ProjectService : updateProject()

ProjectService -> ProjectRepository : findById(id)

ProjectRepository -> Database : SELECT project

Database --> ProjectRepository : project data

ProjectRepository --> ProjectService : project

alt Project Not Found

ProjectService --> ProjectController : 404 Not Found

ProjectController --> Frontend : error response

else Project Exists

ProjectService -> ArchitectureRepository : findById(architectureId)

ArchitectureRepository -> Database : SELECT architecture

Database --> ArchitectureRepository : architecture data

ArchitectureRepository --> ProjectService : architecture

alt Architecture Not Found

ProjectService --> ProjectController : 404 Architecture Not Found

ProjectController --> Frontend : error response

else Architecture Exists

alt Has New Thumbnail Image

ProjectService -> CloudStorageService : uploadImage()

CloudStorageService --> ProjectService : imageUrl

end

ProjectService -> ProjectRepository : UPDATE project

ProjectRepository -> Database : UPDATE project

Database --> ProjectRepository : success

ProjectRepository --> ProjectService : updated

ProjectService --> ProjectController : success

ProjectController --> Frontend : project updated

end

end

end

@enduml