const bookController = require("./../controllers/bookController");
const express=require('express')
const book=express.Router()
// route to get books
book.get("/", bookController.getAllBooks);
// route to get book by id
book.get("/:id", bookController.getBook);
// route to create book
book.post("/", bookController.createBook);
// route to update book
book.put("/:id", bookController.updateBook);
// route to delete book
book.delete("/:id", bookController.deleteBook);


module.exports=book;
