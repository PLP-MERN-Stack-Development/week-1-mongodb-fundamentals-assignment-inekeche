[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19646989&assignment_repo_type=AssignmentRepo)
# MongoDB Fundamentals Assignment

This assignment focuses on learning MongoDB fundamentals including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Assignment Overview

You will:
1. Set up a MongoDB database
2. Perform basic CRUD operations
3. Write advanced queries with filtering, projection, and sorting
4. Create aggregation pipelines for data analysis
5. Implement indexing for performance optimization

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)





# 📚 MongoDB Bookstore Queries

This project contains a series of MongoDB scripts used to practice querying, updating, aggregating, indexing, and optimizing performance on a collection of book records.

## 📦 Collection Setup

Assumes your MongoDB database is named: `plpbooks`.

The collection used: `books`.

### ⚙️ To Run Scripts:

1. Open **MongoDB Shell** (`mongosh`) or connect via your MongoDB GUI (e.g., Compass, MongoDB Atlas).
2. Select your database:

```js
use plpbooks
Run the relevant query snippets provided below.

📝 Assignment Queries: Task Two
1. Find all books in a specific genre (e.g., Fiction)

db.books.find({ genre: "Fiction" }).pretty()
2. Find books published after a certain year

db.books.find({ published_year: { $gt: 1950 } }).pretty()
3. Find books by a specific author

db.books.find({ author: "George Orwell" }).pretty()
4. Update the price of a specific book

db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } })
5. Delete a book by its title

db.books.deleteOne({ title: "Moby Dick" })
🧠 Assignment Queries: Task Three
1. Find books in stock and published after 2010

db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
2. Projection: Return only title, author, and price

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
3. Sort by price (ascending and descending)

// Ascending
db.books.find().sort({ price: 1 })

// Descending
db.books.find().sort({ price: -1 })
4. Pagination: 5 books per page

// Page 1
db.books.find().skip(0).limit(5)

// Page 2
db.books.find().skip(5).limit(5)

// Page 3
db.books.find().skip(10).limit(5)
🧮 Assignment: Task Four – Aggregation Pipeline
1. Average price of books by genre

db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" }, count: { $sum: 1 } } },
  { $sort: { averagePrice: -1 } }
])
2. Author with the most books

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])
3. Group books by publication decade

db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      booksCount: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])


⚡ Assignment: Task Five – Indexing
1. Create an index on the title field

db.books.createIndex({ title: 1 })
2. Create a compound index on author and published_year

db.books.createIndex({ author: 1, published_year: -1 })
3. Use explain() to analyze performance
Before Indexing:

db.books.find({ title: "1984" }).explain("executionStats")
After Compound Index:

db.books.find({ author: "George Orwell" }).sort({ published_year: -1 }).explain("executionStats")
✅ Notes
Ensure the books collection exists and contains documents before running the queries.

You can insert sample data using insertMany() in mongosh or via a GUI.

Replace values like "George Orwell" or "1984" with your own as needed for testing.
