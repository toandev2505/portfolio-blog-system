![IMG_256](https://github.com/user-attachments/assets/48acf056-28ee-4161-9b51-651022550111)

**NGUỒN: [SƠ ĐỒ STATE MACHINE DIAGRAM - COMMENT \[PORTFOLIO\]](https://shorturl.fm/ETSAz)**

**Code**

@startuml

title State Machine Diagram - Comment Status

\[\*\] --> Draft : User Add Comment

state Draft

state Archived

state Rejected

Draft --> Archived : Admin Approve Comment

Draft --> Rejected : Admin Reject Comment

Archived --> \[\*\]

Rejected --> \[\*\]

@enduml
