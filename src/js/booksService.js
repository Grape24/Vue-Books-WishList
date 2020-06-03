import axios from 'axios'
var uniqId = require('lodash.uniqueid');

async function getBooks() {
  let books = JSON.parse(localStorage.getItem('books'));
  if (!books) {
    let books = await axios('http://s3.amazonaws.com/sundaysky-mock/books/listOfBooks.json', {}, { crossdomain: true })
    console.log(books);
    books = books.data.books.map(book => {
      book.isWishList = false;
      book.id = uniqId();
      return book
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
  return books
}

function updateBook(idx, book) {
  let books = JSON.parse(localStorage.getItem('books'));
  books[idx] = book;
  localStorage.setItem('books', JSON.stringify(books))
}

function getBooksForWishList() {
  let books = JSON.parse(localStorage.getItem('books'));
  let booksForWishlist = books.reduce((acc, book) => {
    if (book.isWishList) acc.push(book)
    return acc
  }, [])
  return booksForWishlist
}

function findIndexById(id) {
  let books = JSON.parse(localStorage.getItem('books'));
  let bookIdx = books.findIndex(book => book.id === id)
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
    price: (a,b) =>  a.price - b.price,
    rating: (a,b) => a.rating - b.rating,
  }
  return booksToSort.sort(sortingFunctions[sortBy])
}

export default {
  getBooks,
  updateBook,
  getBooksForWishList,
  findIndexById,
  sortWishList
}