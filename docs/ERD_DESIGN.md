![IMG_256](https://github.com/user-attachments/assets/d2fb1e25-2f90-4943-ac83-1711ead4b7dc)

**NGUỒN: [SƠ ĐỒ ERD \[PORTFOLIO\]](https://shorturl.fm/pJxD2)**

**Code**

@startuml

!theme plain

skinparam Linetype ortho

skinparam nodesep 60

skinparam ranksep 80

package "Hệ thống & Tài khoản" {

entity "Users" as users {

\* id : Long <<PK>>

\--

\* username : Varchar(50)

\* password : Varchar(255)

\* email : Varchar(100) <<UNIQUE>>

role : Enum <<ADMIN, USER>>

\* status : Int <<0: Inactive, 1: Active>>

created\_at : Timestamp

updated\_at : Timestamp

}

}

entity "Notifications" as notifications {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

title : Varchar(255)

content : LongText

type : Enum <<COMMENT\_APPROVED, COMMENT\_REJECTED, ACCOUNT\_LOCKED, ACCOUNT\_UNLOCKED>>

is\_read : Boolean

created\_at : Timestamp

}

package "Hồ sơ cá nhân (Resume)" {

entity "PersonalDetail" as personal {

\* id : Long <<PK>>

\--

\* user\_id : Long <<FK>>

full\_name : Varchar(100)

title : Varchar(150)

bio : Varchar(255)

about\_me : LongText

phone : Varchar(20)

address : Varchar(255)

social\_links : LongText

avatar\_link : Varchar(255)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Education" as edu {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

school\_name : Varchar(150)

degree : Varchar(150)

major : Varchar(150)

from\_date : Varchar(50)

to\_date : Varchar(50)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "WorkExperience" as work {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

company\_name : Varchar(150)

position : Varchar(150)

job\_description : LongText

technologies : Varchar(255)

architecture\_id : Long <<FK>>

from\_date : Varchar(50)

to\_date : Varchar(50)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Achievement" as achieve {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

title : Varchar(200)

issue\_date : Varchar(50)

description : LongText

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Skills" as skills {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

skill\_name : Varchar(100)

skill\_category : Varchar(100)

created\_at : Timestamp

updated\_at : Timestamp

}

}

package "Danh mục sản phẩm" {

entity "Architectures" as architectures {

\* id : Long <<PK>>

name : Varchar(100)

description : LongText

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Projects" as projects {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

\* architecture\_id : Long <<FK>>

title : Varchar(150)

technologies : Varchar(255)

description : LongText

project\_links : LongText

diagram\_links : LongText

demo\_link : Varchar(255)

github\_link : Varchar(255)

thumbnail\_link : Varchar(255)

role : Varchar(150)

team\_size : Int

highlight\_features : LongText

slug : Varchar(200)

from\_date : Varchar(50)

to\_date : Varchar(50)

created\_at : Timestamp

updated\_at : Timestamp

}

}

package "Nội dung Blog" {

entity "Posts" as posts {

\* id : Long <<PK>>

\* user\_id : Long <<FK>>

\* category\_id : Long <<FK>>

title : Varchar(200)

slug : Varchar(200)

content : LongText

short\_description : LongText

thumbnail\_link : Varchar(255)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Comments" as comments {

\* id : Long <<PK>>

\* post\_id : Long <<FK>>

user\_id : Long <<FK>>

parent\_id : Long <<FK>>

content : LongText

\* status : Enum <<DRAFT, ARCHIVED, REJECTED>>

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Categories" as categories {

\* id : Long <<PK>>

name : Varchar(100)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Tags" as tags {

\* id : Long <<PK>>

name : Varchar(50)

created\_at : Timestamp

updated\_at : Timestamp

}

entity "Post\_Tags" as post\_tags {

\* post\_id : Long <<FK>>

\* tag\_id : Long <<FK>>

}

}

' Links

users ||--|| personal

users ||--o{ edu

users ||--o{ work

users ||--o{ achieve

users ||--o{ skills

users ||--o{ projects

users ||--o{ posts

users ||--o{ comments

users ||--o{ notifications

architectures ||--o{ projects

architectures ||--o{ work

categories ||--o{ posts

posts ||--o{ comments

posts ||--o{ post\_tags

tags ||--o{ post\_tags

comments ||--o{ comments : "replies"

@enduml
