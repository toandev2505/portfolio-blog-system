![IMG_256]()

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