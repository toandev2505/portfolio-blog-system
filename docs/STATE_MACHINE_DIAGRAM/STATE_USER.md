![IMG_256](https://github.com/user-attachments/assets/4d13777b-d367-4baf-879e-8adb12b3b9f4)

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
