# Library API

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A RESTful API built with TypeScript, Express, and MongoDB for managing a library system with books, authors, and loan operations.

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)

### Running with Docker

```bash
# Build and start services
docker-compose up -d

# Stop services
docker-compose down
```

The API will be available at `http://localhost:3000`

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### Authors

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/authors`     | Create a new author |
| GET    | `/api/authors`     | List all authors    |
| GET    | `/api/authors/:id` | Get author by ID    |
| PUT    | `/api/authors/:id` | Update author       |
| DELETE | `/api/authors/:id` | Delete author       |

**Example Request:**

```json
POST /api/authors
{
  "name": "Gabriel",
  "lastName": "García Márquez",
  "nationality": "Colombian",
  "birthdate": "1927-03-06T00:00:00.000Z"
}
```

### Books

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/api/books`        | Create a new book            |
| GET    | `/api/books`        | List all books (paginated)   |
| GET    | `/api/books/:id`    | Get book by ID               |
| GET    | `/api/books/search` | Search books by title/author |
| PUT    | `/api/books/:id`    | Update book                  |
| DELETE | `/api/books/:id`    | Delete book                  |

**Example Request:**

```json
POST /api/books
{
  "title": "One Hundred Years of Solitude",
  "isbn": "978-0-06-088328-7",
  "authorId": "507f1f77bcf86cd799439011",
  "year": 1967,
  "genre": "Magical Realism",
  "quantity": 5
}
```

**Search Examples:**

```bash
# Search by title
GET /api/books/search?title=Solitude

# Search by author
GET /api/books/search?authorId=507f1f77bcf86cd799439011

# Search by both
GET /api/books/search?title=Solitude&authorId=507f1f77bcf86cd799439011
```

### Loans

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/api/loans`            | Register a book loan   |
| GET    | `/api/loans/active`     | List active loans      |
| PUT    | `/api/loans/:id/return` | Return a borrowed book |

**Example Request:**

```json
POST /api/loans
{
  "bookId": "507f1f77bcf86cd799439011",
  "username": "John Doe",
  "loanDate": "2025-01-15T00:00:00.000Z"
}
```

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Containerization:** Docker

## Project Structure

```
library-api/
├── src/
│   ├── controllers/      # Request handlers (future)
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.ts         # Entry point
├── dist/                 # Compiled JavaScript
├── docker-compose.yaml   # Docker services
├── Dockerfile
├── tsconfig.json         # TypeScript config
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=dev
PORT=3000
MONGO_URL_DEV=mongodb://admin:password@localhost:27017/library-db?authSource=admin
MONGO_URL_PROD=mongodb://admin:password@mongodb:27017/library-db?authSource=admin
```

## Docker Services

- **MongoDB:** Port 27017

  - Username: `admin`
  - Password: `123456`
  - Database: `library-db`

- **Backend:** Port 3000

## Response Format

**Success Response:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Example Book",
  ...
}
```

**Error Response:**

```json
{
  "message": "Error description",
  "status": 400
}
```

## Business Rules

- ISBN must be unique for each book
- Books can only be loaned if `quantity > 0`
- Quantity decreases by 1 when a book is loaned
- Quantity increases by 1 when a book is returned
- Active loans have `returned: false`
