
---

# 📚 Library Book Management System (Backend)

A backend application built with **NestJS**, **TypeORM**, and **SQLite**, providing a complete **Library Book Management System**.

This system manages **Authors**, **Books**, and **Ratings**, offering CRUD functionality, search and filter capabilities, relations between entities, and more.

---

## 🚀 Features

✅ Manage Authors (CRUD)  
✅ Manage Books (CRUD)  
✅ Rate Books (CRUD)  
✅ Search and Filter functionality  
✅ Relational data with computed fields (average ratings, book counts)  
✅ RESTful API built with **NestJS**  
✅ SQLite database using **TypeORM**  
✅ Global validation and clean functional programming practices  
✅ Fully unit-tested services and controllers  
✅ E2E testing with **Supertest**  
✅ Code style enforced with **ESLint** and **Prettier**  
✅ **Swagger UI** for API documentation  
✅ **Database seeding** with Faker.js for development  
✅ Extensible project structure aligned with clean architecture principles  

---

## 🛠️ Tech Stack

| Name           | Description                               |
|----------------|-------------------------------------------|
| **NestJS**     | Backend Framework (Node.js + TypeScript)  |
| **TypeORM**    | ORM for database interaction              |
| **SQLite**     | Lightweight SQL database                  |
| **Jest**       | Unit & E2E testing framework              |
| **Supertest**  | E2E HTTP assertions                       |
| **Swagger UI** | API Documentation Interface (`@nestjs/swagger`) |
| **Faker.js**   | Fake data generation for database seeding |
| **ESLint**     | Code linting                              |
| **Prettier**   | Code formatting                           |

---

## 📂 Project Structure

```
src/
  modules/
    authors/
      controllers/
      dto/
      models/
      presenters/
      repositories/
      services/
    books/
      controllers/
      dto/
      models/
      presenters/
      repositories/
      services/
    ratings/
      controllers/
      dto/
      models/
      presenters/
      repositories/
      services/
  common/
    seed/                  # Seeder scripts and logic
    swagger/               # Swagger setup and configuration
  app.controller.ts
  app.service.ts
  app.module.ts
  main.ts
```

---

## ⚙️ Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/library-book-management-backend.git
cd library-book-management-backend
```

---

### 2. Install Dependencies
```bash
npm install
```

---

### 3. Running the Application
#### Development (watch mode)
```bash
npm run start:dev
```

#### Production
```bash
npm run build
npm run start:prod
```

---

### 4. Database
- Uses **SQLite** (no setup needed)
- Database file: `library.db`  
- Automatically created when running the app (`synchronize: true` in `TypeORM`)

#### Seed Database with Sample Data
Seeder creates sample authors, books, and ratings with **Faker.js**.

```bash
npm run seed
```

Seeder is located in `src/common/seed`.

---

### 5. API Documentation (Swagger UI)
- Runs automatically when the server starts
- Access Swagger UI at:  
  👉 [http://localhost:3000/api](http://localhost:3000/api/docs#)

Provides detailed documentation for all API endpoints with available parameters and responses.

---

### 6. Running Tests
#### Unit Tests
```bash
npm run test
```

#### E2E Tests
```bash
npm run test:e2e
```

#### Test Coverage
```bash
npm run test:cov
```

---

## 📝 API Endpoints Overview

### Root
| Method | Endpoint | Description                     |
|--------|----------|---------------------------------|
| GET    | `/`      | Health check / welcome message. |

---

### Authors
| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| GET    | `/authors`     | List authors (search, sort)        |
| GET    | `/authors/:id` | Author details with stats          |
| POST   | `/authors`     | Create a new author                |
| PATCH  | `/authors/:id` | Update an author                   |
| DELETE | `/authors/:id` | Delete an author                   |

---

### Books
| Method | Endpoint     | Description                         |
|--------|--------------|-------------------------------------|
| GET    | `/books`     | List books (search, sort)          |
| GET    | `/books/:id` | Book details with average rating   |
| POST   | `/books`     | Create a new book                  |
| PATCH  | `/books/:id` | Update a book                      |
| DELETE | `/books/:id` | Delete a book                      |

---

### Ratings
| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/ratings/book/:bookId`   | Get ratings for a specific book    |
| POST   | `/ratings`                | Add a new rating                   |
| PATCH  | `/ratings/:id`            | Update a rating                    |
| DELETE | `/ratings/:id`            | Delete a rating                    |

---

## ⚙️ Functional Programming & Validation
- Global validation using NestJS `ValidationPipe`
- Functional programming principles:  
  - `map()`, `filter()` instead of `for`/`if`  
  - Nullish coalescing (`??`), destructuring, and immutability
- Presenters for shaping clean, consistent API responses

---

## 📚 Documentation
- **Swagger UI**: Auto-generated API docs at `/api/docs#`
- See `src/modules/**` for DTOs, Presenters, and Repositories
- `common/seed` for Seeder logic
- `common/swagger` for Swagger setup

---

## 🧪 Testing
- 100% unit test coverage for services and controllers (goal)
- E2E tests cover HTTP requests & database integration
- Run `npm run test:cov` for coverage reports

---

## 📌 To-Do / Improvements
- [x] Add Swagger API docs (`@nestjs/swagger`)
- [x] Seed database with fixtures using Faker.js
- [ ] Implement user authentication (optional)
- [ ] Pagination for large datasets (optional)
- [ ] Dockerize the app (optional)

---

## ✨ Author(s)
**Library Book Management Backend**  
Built by CodersCode

---

## License
This project is licensed under the MIT License.

---

## 🔗 Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Faker.js](https://fakerjs.dev/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

---
