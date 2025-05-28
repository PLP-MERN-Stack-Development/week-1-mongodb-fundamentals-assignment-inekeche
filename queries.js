//ASSIGMENT QUERIES TASK TWO

//1. Find all books in a specific genre (e.g., 'Fiction')

db.books.find({ genre: "Fiction" }).pretty()
//2. Find books published after a certain year (e.g., after 1950)

db.books.find({ published_year: { $gt: 1950 } }).pretty()
// 3. Find books by a specific author (e.g., 'George Orwell')

db.books.find({ author: "George Orwell" }).pretty()
//4. Update the price of a specific book (e.g., change '1984' to $12.99)

db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.99 } }
)
//5. Delete a book by its title (e.g., 'Moby Dick')

db.books.deleteOne({ title: "Moby Dick" })




//ASSIGMENT QUERIES TASK THREE




//1. Find books that are both in stock and published after 2010

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})


//2. Use projection to return only the title, author, and price fields

db.books.find(
  {}, // You can add filters here
  { title: 1, author: 1, price: 1, _id: 0 }
)

//Combine with filters, e.g., books in stock after 2010:


db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    title: 1, author: 1, price: 1, _id: 0
  }
)

//3. Sorting books by price
//Ascending (low to high):

db.books.find().sort({ price: 1 })

//Descending (high to low):

db.books.find().sort({ price: -1 })


//4. Implement pagination (5 books per page)
//Page 1 (first 5 books):


db.books.find().skip(0).limit(5)

//Page 2 (next 5 books):

db.books.find().skip(5).limit(5)


//Page 3 (next 5 books):

db.books.find().skip(10).limit(5)




//ASSIGNMENT TASK FOUR



//1. Calculate the average price of books by genre

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }
  }
])
//This groups books by genre, calculates the average price, and also counts how many books are in each genre.


//  2. Find the author with the most books in the collection

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
])
//This finds the author with the highest number of books.

//3. Group books by publication decade and count them

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
//This calculates the publication decade by subtracting the year mod 10, appends 's' (e.g., "1950s"), then groups and counts.


//ASSIGNMENT TASK FIVE


//1. Create an index on the title field

db.books.createIndex({ title: 1 })
// This helps speed up searches on book titles, especially for exact matches and alphabetical sorts.

//2. Create a compound index on author and published_year

db.books.createIndex({ author: 1, published_year: -1 })
// This is efficient for queries that filter or sort by both author and publication year, especially when retrieving the latest books by an author.

//3. Use explain() to analyze query performance
//Compare query plans before and after indexing:



//Example: Search by title (before creating index)

db.books.find({ title: "1984" }).explain("executionStats")


//Example: Search by author + published_year (after compound index)

db.books.find({ author: "George Orwell" }).sort({ published_year: -1 }).explain("executionStats")


