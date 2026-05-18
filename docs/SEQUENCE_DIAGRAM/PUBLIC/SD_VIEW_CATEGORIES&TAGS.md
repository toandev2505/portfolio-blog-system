![IMG_256](https://github.com/user-attachments/assets/176cda80-a868-4320-b8d8-cd9ba74b2126)

**NGUỒN: [SƠ ĐỒ SEQUENCE DIAGRAM - VIEW CATEGORIES & TAGS \[PORTFOLIO\]](https://shorturl.fm/iXBvC)**

**Code**

@startuml

autonumber

title Sequence Diagram - View Categories

actor User

participant Frontend

participant CategoryController

participant CategoryService

participant CategoryRepository

participant Database

User -> Frontend : View Categories

Frontend -> CategoryController : GET /api/v1/public/categories

CategoryController -> CategoryService : getCategories()

CategoryService -> CategoryRepository : findAll()

CategoryRepository -> Database : SELECT categories

Database --> CategoryRepository : categories data

CategoryRepository --> CategoryService : categories

CategoryService --> CategoryController : categories

CategoryController --> Frontend : categories data

Frontend --> User : Display Categories

@enduml
