## Library-api

REST API to manage a book library. The system should allow CRUD operations on books and authors, as well as implement search and loan features.

# Instructions

You run this project, using docker with docker-compose:

        docker-compose build
        docker-compose up -d

The database will be running on: [mongodb://admin:123456@mongodb:27017/library-db](mongodb://admin:123456@mongodb:27017/library-db)

and express backend will be runnning on: [http://localhost:3000](http://localhost:3000)

# Endpoints

## Authors

- POST /api/authors - Create an author

        {
            "name": "Addison",
            "lastName": "Reyes",
            "nationality": "Dominican",
            "birthdate": "2002-03-2T00:00:00.000Z"
        }

- GET /api/authors - List all authors
- GET /api/authors/:id - Get a specific author
- PUT /api/authors/:id - Update an author
- DELETE /api/authors/:id - Delete an author

## Books

- POST /api/books - Create a book

        {
            "title": "How to use this awesome api",
            "isbn": "978-1-80056-252-3",
            "autorId": "68f794cdddb78d8147b12b5a",
            "year": 2025,
            "genre": "Software Enginnering",
            "quantity": 67,
            "borrowed": false
        }

- GET /api/books - List all books (with pagination)
- GET /api/books/:id - Get a specific book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book
- GET /api/books/search?title=...&author=... - Search books

## Loans

- POST /api/loans - Register a loan

        {
            "bookId": "68f7e63dddb78d8147b12b62",
            "username": "Amin Cedano",
            "loanDate": "2025-05-15T00:00:00.000Z",
            "returnDate": null,
            "returned": false
        }

- PUT /api/loans/:id/return - Register return
- GET /api/loans/active - List active loans
