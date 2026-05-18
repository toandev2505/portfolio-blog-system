![IMG_256](https://github.com/user-attachments/assets/d125e761-a7a7-4d68-a43c-ea494004f202)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - ADD PROJECT \[PORTFOLIO\]](https://shorturl.fm/2XeLF)**

**Code**

@startuml

autonumber

title Sequence Diagram - Add Project

actor User

participant Frontend

participant JwtFilter

participant ProjectController

participant ProjectService

participant ArchitectureRepository

participant CloudStorageService

participant ProjectRepository

participant Database

User -> Frontend : Enter Project Information

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> User : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> ProjectController : POST /api/v1/user/projects

ProjectController -> ProjectService : createProject()

ProjectService -> ArchitectureRepository : findById(architectureId)

ArchitectureRepository -> Database : SELECT architecture

Database --> ArchitectureRepository : architecture data

ArchitectureRepository --> ProjectService : architecture

alt Architecture Not Found

ProjectService --> ProjectController : 404 Architecture Not Found

ProjectController --> Frontend : error response

else Architecture Exists

alt Has Thumbnail Image

ProjectService -> CloudStorageService : uploadImage()

CloudStorageService --> ProjectService : imageUrl

end

ProjectService -> ProjectRepository : save(project)

ProjectRepository -> Database : INSERT project

Database --> ProjectRepository : success

ProjectRepository --> ProjectService : created project

ProjectService --> ProjectController : success

ProjectController --> Frontend : project created

end

end

@enduml
