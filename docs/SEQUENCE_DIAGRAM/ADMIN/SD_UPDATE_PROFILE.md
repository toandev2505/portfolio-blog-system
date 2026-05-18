![IMG_256]()

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - UPDATE PROFILE \[PORTFOLIO\]](https://shorturl.fm/nRaeO)**

**Code**

@startuml

autonumber

title Sequence Diagram - Update Admin Profile

actor Admin

participant Frontend

participant JwtFilter

participant ProfileController

participant ProfileService

participant PersonalDetailRepository

participant SkillRepository

participant EducationRepository

participant AchievementRepository

participant WorkExperienceRepository

participant Database

Admin -> Frontend : Update Profile Information

Frontend -> JwtFilter : Validate JWT

alt Unauthorized

JwtFilter --> Frontend : 401 Unauthorized

Frontend --> Admin : Redirect Login

else Authorized

JwtFilter --> Frontend : Authenticated Admin

Frontend -> ProfileController : PUT /api/v1/admin/profile

ProfileController -> ProfileService : updateAdminProfile()

ProfileService -> JwtFilter : getCurrentUser()

JwtFilter --> ProfileService : admin info

ProfileService -> PersonalDetailRepository : findByUserId(userId)

PersonalDetailRepository -> Database : SELECT personal detail

Database --> PersonalDetailRepository : profile data

PersonalDetailRepository --> ProfileService : profile

alt Profile Not Found

ProfileService --> ProfileController : 404 Not Found

ProfileController --> Frontend : error response

else Profile Exists

ProfileService -> PersonalDetailRepository : UPDATE personal detail

PersonalDetailRepository -> Database : UPDATE profile

Database --> PersonalDetailRepository : success

PersonalDetailRepository --> ProfileService : updated

alt Has Skills

loop For Each Skill

ProfileService -> SkillRepository : saveOrUpdate(skill)

SkillRepository -> Database : INSERT/UPDATE skill

Database --> SkillRepository : success

end

end

alt Has Education

loop For Each Education

ProfileService -> EducationRepository : saveOrUpdate(education)

EducationRepository -> Database : INSERT/UPDATE education

Database --> EducationRepository : success

end

end

alt Has Achievements

loop For Each Achievement

ProfileService -> AchievementRepository : saveOrUpdate(achievement)

AchievementRepository -> Database : INSERT/UPDATE achievement

Database --> AchievementRepository : success

end

end

alt Has Work Experience

loop For Each Work Experience

ProfileService -> WorkExperienceRepository : saveOrUpdate(work)

WorkExperienceRepository -> Database : INSERT/UPDATE work experience

Database --> WorkExperienceRepository : success

end

end

ProfileService --> ProfileController : success

ProfileController --> Frontend : profile updated

end

end

@enduml