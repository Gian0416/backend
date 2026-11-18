import * as bookModel from "../models/bookModel.js";

export const fetchAllBooks = async () => {
  const books = await bookModel.fetch();
  return books;
};

const doesBookExist = async (book) => {
  let existing;

  if (Object.hasOwn(book, "id")) {
    // update: look the book up by its id
    existing = await bookModel.findBookById(book.id);
  } else {
    // create: look the book up by name + author
    existing = await bookModel.findBookByNameAndAuthor(book.name, book.author);
  }

  if (existing.length > 0) {
    return true;
  }

  return false;
};

export const createBook = async (book) => {
  if (!book.name || !book.author) {
    throw new Error("Name and author is required!");
  }

  const existing = await doesBookExist(book);

  if (existing) {
    throw new Error("Book already exist!");
  }

  const bookId = await bookModel.insert(book);
  return bookId;
};

export const updateBook = async (book) => {
  if (!book.name || !book.author) {
    throw new Error("Name and author is required!");
  }

  const existing = await doesBookExist(book);

  if (!existing) {
    throw new Error("Book does not exist!");
  }

  const updatedBook = await bookModel.update(book);
  return updatedBook;
};

export const deleteBook = async (id) => {
  const book = { id };

  const existing = await doesBookExist(book);

  if (!existing) {
    throw new Error("Book does not exist!");
  }

  const deletedBook = await bookModel.remove(id);
  return deletedBook;
};

export const findBookById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM book WHERE id = ?", [id]);
  return rows;
};
