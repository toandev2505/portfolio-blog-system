![IMG_256](https://github.com/user-attachments/assets/05c4511f-5d80-481c-827a-8dde6c47c29f)

**NGUỒN: [SƠ ĐỒ STATE MACHINE DIAGRAM - NOTIFICATION \[PORTFOLIO\]](https://shorturl.fm/MttSJ)**

**Code**

@startuml

title State Machine Diagram - Notification Type

\[\*\] --> CommentApproved : Comment Approved

\[\*\] --> CommentRejected : Comment Rejected

\[\*\] --> AccountLocked : Account Locked

\[\*\] --> AccountUnlocked : Account Unlocked

state CommentApproved

state CommentRejected

state AccountLocked

state AccountUnlocked

@enduml
