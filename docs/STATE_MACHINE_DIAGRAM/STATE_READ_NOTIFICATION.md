![IMG_256](https://github.com/user-attachments/assets/40aa7915-6d6d-4e45-8770-0e12d14020f9)

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
