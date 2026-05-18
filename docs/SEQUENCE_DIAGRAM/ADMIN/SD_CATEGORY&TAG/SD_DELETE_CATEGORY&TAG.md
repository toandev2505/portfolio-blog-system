![IMG_256](https://github.com/user-attachments/assets/4608d0a5-0b8c-4587-b8f3-0181c9a8c7ba)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - DELETE TAG \[PORTFOLIO\]](https://shorturl.fm/AmHz3)**

**Code**

@startuml

autonumber

title Sequence Diagram - Delete Tag

actor User

participant Frontend

participant JwtFilter

participant TagController

participant TagService

participant TagRepository

participant PostTagRepository

participant Database

User -> Frontend : Delete Tag

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

else Authorized

JwtFilter --> Frontend : Authenticated

Frontend -> TagController : DELETE /api/v1/user/tags/{id}

TagController -> TagService : deleteTag(id)

TagService -> TagRepository : findById(id)

TagRepository -> Database : SELECT tag

Database --> TagRepository : tag data

TagRepository --> TagService : tag

alt Tag Not Found

TagService --> TagController : 404 Not Found

else Tag Exists

TagService -> PostTagRepository : existsByTagId(id)

PostTagRepository -> Database : SELECT post\_tags

Database --> PostTagRepository : relation data

PostTagRepository --> TagService : exists result

alt Tag Is Being Used

TagService --> TagController : 409 Tag In Use

TagController --> Frontend : error response

else Tag Not Used

TagService -> TagRepository : DELETE tag

TagRepository -> Database : DELETE tag

Database --> TagRepository : success

TagRepository --> TagService : deleted

TagService --> TagController : success

TagController --> Frontend : tag deleted

end

end

end

@enduml
