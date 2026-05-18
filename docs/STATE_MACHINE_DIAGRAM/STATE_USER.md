![IMG_256]()

**NGUỒN: [SƠ ĐỒ STATE MACHINE DIAGRAM - USER ACCOUNT \[PORTFOLIO\]](https://shorturl.fm/Kwy1t)**

**Code**

@startuml

title State Machine Diagram - User Status

\[\*\] --> Active : Account Created

state Active

state Inactive

Active --> Inactive : Admin Lock Account

Inactive --> Active : Admin Unlock Account

@enduml