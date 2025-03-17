# 📚 Book Management System - Backend Roadmap (Prompt-Based with ChatGPT)

This document outlines a structured **step-by-step prompting plan** for building the entire backend system of the **Library Book Management System**, using **ChatGPT** and following the provided project subject instructions.

---

## ✅ 1. Backend Project Initialization

### 🔹 Prompt 1: Initialize the NestJS Backend Project
```
Create a new NestJS project named `backend`.
```

### 🔹 Prompt 2: Install and Configure TypeORM with SQLite
```
Install TypeORM and SQLite in the NestJS project. Configure the `TypeOrmModule` in `app.module.ts` to connect to an SQLite database named `library.db`.
```

### 🔹 Prompt 3: Create `.env` and Load Database Configuration
```
Create a `.env` file and configure the SQLite database path. Ensure the backend loads this configuration using the `dotenv` package.
```

---

## ✅ 2. Define Project Folder Structure (Backend)

### 🔹 Prompt 4: Create Backend Folder Structure
```
Create the following folder structure in the NestJS `src/` directory:

src/
├── books/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── dtos/
│   ├── presenters/
│   └── models/
├── authors/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── dtos/
│   ├── presenters/
│   └── models/
```

---

## ✅ 3. Database Entities (Models)

### 🔹 Prompt 5: Create the Book Entity
```
Generate a NestJS Book entity with the following fields:
- id (uuid)
- title (string)
- price (number)
- publishedYear (number)
- author (relation to Author entity)
- ratings (one-to-many relation to Rating entity)
```

### 🔹 Prompt 6: Create the Author Entity
```
Generate a NestJS Author entity with the following fields:
- id (uuid)
- name (string)
- photo (string)
- biography (string)
- books (one-to-many relation to Book entity)
```

### 🔹 Prompt 7: Create the Rating Entity
```
Generate a NestJS Rating entity with the following fields:
- id (uuid)
- rating (number, 1-5)
- comment (optional string)
- book (many-to-one relation to Book entity)
- createdAt (date)
```

---

## ✅ 4. Data Transfer Objects (DTOs)

### 🔹 Prompt 8: Create DTOs for Books
```
Generate CreateBookDto, UpdateBookDto, and ResponseBookDto. Use `class-validator` decorators for validation.
```

### 🔹 Prompt 9: Create DTOs for Authors
```
Generate CreateAuthorDto, UpdateAuthorDto, and ResponseAuthorDto. Use `class-validator` decorators for validation.
```

### 🔹 Prompt 10: Create DTOs for Ratings
```
Generate CreateRatingDto. Include validation for rating values between 1 and 5.
```

---

## ✅ 5. Repositories (Optional Layer for Complex Queries)

### 🔹 Prompt 11: Create Custom Repositories
```
Create BookRepository and AuthorRepository with custom methods (if needed). Use the TypeORM Repository pattern.
```

---

## ✅ 6. Services (Business Logic Layer)

### 🔹 Prompt 12: Create Book Service
```
Generate BookService with methods:
- findAll (with filtering by title and sorting)
- findOne (by id)
- create
- update
- delete
- addRating
- getRatings (sortable by creation date)
```

### 🔹 Prompt 13: Create Author Service
```
Generate AuthorService with methods:
- findAll (with filtering by name)
- findOne (by id)
- create
- update
- delete
- addBook
- removeBook
```

### 🔹 Prompt 14: Create Rating Service (Optional, or within BookService)
```
Generate methods for creating and listing ratings related to books.
```

---

## ✅ 7. Controllers (API Routes Layer)

### 🔹 Prompt 15: Create Book Controller
```
Generate BookController with routes:
- GET /books
- GET /books/:id
- POST /books
- PUT /books/:id
- DELETE /books/:id
- POST /books/:id/ratings
- GET /books/:id/ratings
```

### 🔹 Prompt 16: Create Author Controller
```
Generate AuthorController with routes:
- GET /authors
- GET /authors/:id
- POST /authors
- PUT /authors/:id
- DELETE /authors/:id
- POST /authors/:id/books
- DELETE /authors/:id/books/:bookId
```

---

## ✅ 8. Presenters (Response Formatting Layer)

### 🔹 Prompt 17: Create Presenters
```
Create BookPresenter and AuthorPresenter to format API responses according to the project specs.
```

---

## ✅ 9. Validation & Functional Programming Practices

### 🔹 Prompt 18: Apply Validation Rules
```
Ensure all DTOs use `class-validator`. Validate inputs in Controllers.
```

### 🔹 Prompt 19: Use Functional Programming Principles
```
Refactor any imperative code (if/for) to functional paradigms (map/filter/reduce) where applicable.
```

---

## ✅ 10. Unit Testing (Jest)

### 🔹 Prompt 20: Write Unit Tests for Services and Controllers
```
Generate unit tests using Jest for BooksService, AuthorsService, and their Controllers. Include both success and failure scenarios.
```

---

## ✅ 11. API Documentation (Optional but Recommended)

### 🔹 Prompt 21: Generate API Documentation
```
Use Swagger with NestJS to document the backend API endpoints.
```

---

## ✅ 12. Finalize and Test Backend System

### 🔹 Prompt 22: End-to-End Testing
```
Run all tests, ensure API endpoints work via Postman or similar.
```

### 🔹 Prompt 23: Prepare Backend for Frontend Integration
```
Enable CORS in `main.ts` to allow React frontend to make API requests.
```

---

## ✅ 13. Git Workflow

### 🔹 Prompt 24: Git Best Practices
```
Follow these Git practices:
- Create feature branches (feat/books, feat/authors)
- Make regular commits: "feat(book): add CRUD operations for books"
- Ensure main branch is stable and buildable
```

