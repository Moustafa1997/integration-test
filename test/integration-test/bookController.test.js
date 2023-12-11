//const bookController = require("../../controllers/bookController");
require("dotenv").config({
  path: `${__dirname}/../../config.env`,
});
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Book = require("../../models/book-model");

const bookData = [
  {
    title: "Test Book",
    price: 120,
  },
  {
    title: "Test Book 2",
    price: 150,
  },
];

beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE_TEST);
});
afterEach(async () => {
  await Book.deleteMany();
  await mongoose.connection.close();
});
//test createBook
describe("createBook", () => {
  it("should create a new book", async () => {
    const response = await request(app).post("/api/book").send(bookData);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.book).toBeDefined();
    expect(response.body.data.book.length).toBe(2);
    //expect(response.body.data.books.len).toBe(2);
  });
  it("shoud return staus code 400 if error found in creating book ", async () => {
    const response = await request(app).post("/api/book").send({
      price: 120,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe("fail");
  });
});
//test getAllbooks
describe("getAllBooks", () => {
  it("should return all books", async () => {
    await Book.insertMany(bookData);
    const response = await request(app).get("/api/book");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.books.length).toBe(2);
  });
  
});
//test getBookById
describe("getBookById", () => {
  it("should return a book by id", async () => {
    await Book.insertMany(bookData);
    const bookId = await Book.find({
      title: "Test Book",
    });
    //  console.log(bookId)
    // Replace with the actual book id
    const response = await request(app).get(`/api/book/${bookId[0]._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.book).toBeDefined();
    //console.log(response.body.data.book[0]);
    expect(response.body.data.book.title).toBe("Test Book");
  });
});
//test updateBook
describe("updateBook", () => {
  it("should update a book", async () => {
    await Book.insertMany(bookData);
    const bookId = await Book.find({
      title: "Test Book 2",
    }); // Replace with the actual book id
    const updateData = {
      title: "Updated Book",
    };
    // console.log(bookId);
    const response = await request(app)
      .put(`/api/book/${bookId[0]._id}`)
      .send(updateData);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.book).toBeDefined();
    expect(response.body.data.book).toMatchObject({
      title: "Updated Book",
    });
    expect(response.body.message).toMatch("updated success");
  });
});
//test deleteBook
// test\integration-test\bookController.test.js

describe("deleteBook", () => {
  it("should delete a book", async () => {
    await Book.insertMany(bookData);
    const bookId = await Book.find({
      title: "Test Book",
    });
    const response = await request(app).delete(`/api/book/${bookId[0]._id}`);
    //  console.log(response);
    expect(response.statusCode).toBe(204);
  });
});
