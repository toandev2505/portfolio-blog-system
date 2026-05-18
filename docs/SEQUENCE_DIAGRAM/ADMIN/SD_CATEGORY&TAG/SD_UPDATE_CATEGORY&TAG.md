![IMG_256](https://github.com/user-attachments/assets/6a7dd360-9618-45b7-a301-2a670b2b32f5)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE TAG \[PORTFOLIO\]](https://shorturl.fm/i1vYP)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update Tag

actor User

participant Frontend

participant JwtFilter

participant TagController

participant TagService

participant TagRepository

participant Database

User -> Frontend : Edit Tag

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> TagController : PUT /api/v1/user/tags/{id}

TagController -> TagService : updateTag()

TagService -> TagRepository : findById(id)

TagRepository -> Database : SELECT tag

Database --> TagRepository : tag data

TagRepository --> TagService : tag

alt Tag Not Found

TagService --> TagController : 404 Not Found

TagController --> Frontend : error response

else Tag Exists

TagService -> TagRepository : findByName(name)

TagRepository -> Database : SELECT tag by name

Database --> TagRepository : tag data

TagRepository --> TagService : tag

alt Tag Name Already Exists

TagService --> TagController : 409 Conflict

TagController --> Frontend : error response

else Valid Name

TagService -> TagRepository : UPDATE tag

TagRepository -> Database : UPDATE tag

Database --> TagRepository : success

TagRepository --> TagService : updated

TagService --> TagController : success

TagController --> Frontend : tag updated

end

end

end

@enduml
