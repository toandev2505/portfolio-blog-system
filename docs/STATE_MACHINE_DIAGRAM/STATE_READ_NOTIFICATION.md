![IMG_256]()

**NGUỒN: [SƠ ĐỒ STATE MACHINE DIAGRAM - READ NOTIFICATION \[PORTFOLIO\]](https://shorturl.fm/vR2i5)**

**Code**

@startuml

title State Machine Diagram - Notification Read Status

\[\*\] --> Unread : Notification Created

state Unread

state Read

Unread --> Read : User Open Notification

Read --> \[\*\]

@enduml