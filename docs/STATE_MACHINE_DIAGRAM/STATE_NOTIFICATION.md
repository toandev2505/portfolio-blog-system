![IMG_256]()

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