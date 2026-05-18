![IMG_256](https://github.com/user-attachments/assets/72ecee88-f1b2-47ed-9640-4710fadfd469)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPLOAD CV \[PORTFOLIO\]](https://shorturl.at/XssFR)**

**Code**

@startuml

autonumber

title Sequence Diagram - Upload CV

actor User

participant Frontend

participant JwtFilter

participant CVController

participant CVService

participant FileStorageService

participant Database

User -> Frontend : Upload CV File

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

Frontend -> CVController : PUT /api/v1/user/cv

CVController -> CVService : uploadCV()

CVService -> FileStorageService : saveFile()

FileStorageService --> CVService : fileUrl

CVService -> Database : UPDATE cv\_url

Database --> CVService : success

CVService --> CVController : uploaded

CVController --> Frontend : success response

end

@enduml
