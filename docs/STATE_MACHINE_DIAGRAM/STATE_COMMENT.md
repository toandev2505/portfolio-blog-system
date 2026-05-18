![IMG_256]()

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