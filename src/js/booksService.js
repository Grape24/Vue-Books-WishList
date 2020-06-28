import axios from 'axios'
let uniqId = require('lodash.uniqueid');

async function getBooks() {
  const books = loadBooks();
  if (!books) {
    books = await fetchBooks();
    localStorage.setItem('books', JSON.stringify(books))
  }
  return books
}

function updateBook(id, book) {
  const books = loadBooks();
  const bookIdx = findIndexById(id);
  books.splice(bookIdx, 1, book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromWL(id) {
  const books = loadBooks();
  const bookIdx = findIndexById(id);
  books[bookIdx].isWishList = false;
  localStorage.setItem('books', JSON.stringify(books));
}

function findIndexById(id) {
  const books = loadBooks();
  const bookIdx = books.findIndex(book => book.id === id);
  return bookIdx;
}

function sortWishList(sortBy, booksToSort) {
  const sortingFunctions = {
    title: (a, b) => {
      let titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    },
    price: (a, b) => a.price - b.price,
    rating: (a, b) => a.rating - b.rating,
  }
  return Promise.resolve(booksToSort.sort(sortingFunctions[sortBy]))
}

function loadBooks() {
  let books;
  try {
    books = JSON.parse(localStorage.getItem('books'));
  }
  catch {
    console.log(err);
  }
  return books;
}

async function fetchBooks() {
  try {
    const books = await axios('http://s3.amazonaws.com/sundaysky-mock/books/listOfBooks.json')
    console.log(books);//fetch books, should be different function
    books = books.data.books.map(book => {
      book.isWishList = false;
      book.id = uniqId();
      return book
    })
    return books;
  } catch (err) {
    console.log(err)
  }
}


export default {
  getBooks,
  updateBook,
  findIndexById,
  sortWishList,
  removeBookFromWL
}