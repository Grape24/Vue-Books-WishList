import Vue from 'vue'
import Vuex from 'vuex'
import booksService from '../js/booksService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    currIdx: 0,
    booksForWishList: []
  },
  mutations: {
    setBooks(state, { books }) {
      state.books = books;
      state.booksForWishList = state.books.filter(book => book.isWishList)
    },
    setIdx(state, { val }) {
      state.currIdx += val;
    },
    toggleAddBook(state, { isAdd }) {
      state.books[state.currIdx].isWishList = isAdd;
    },
    removeBookFromWL(state, { id }) {
      const bookIdx = state.books.findIndex(book => book.id === id)
      state.books[bookIdx].isWishList = false;
    },
    sort(state, { sortedBooks }) {
      state.booksForWishList = sortedBooks;
    
    }

  },
  actions: {
    async loadBooks(context) {
      const books = await booksService.getBooks();
      context.commit({ type: 'setBooks', books })
      return books
    },
    setIdx(context, val) {
      context.commit({ type: 'setIdx', val })
    },
    toggleAdd(context, isAdd) {
      const { books, currIdx } = this.state;
      booksService.updateBook(books[currIdx].id, books[currIdx])
      context.commit({ type: 'toggleAddBook', isAdd })
    },
    removeBookFromWL(context, id) {
      booksService.removeBookFromWL(id);
      context.commit({ type: 'removeBookFromWL', id })
    },
    async sortWL(context, sortBy) {
      const { booksForWishList } = this.getters
      const sortedBooks = await booksService.sortWishList(sortBy, booksForWishList)
      console.log(sortedBooks);
      context.commit({ type: 'sort', sortedBooks })

    }
  },
  getters: {
    books(state) {
      return state.books;
    },
    booksForWishList(state) {
      return state.booksForWishList;
    },
    currIdx(state) {
      return state.currIdx;
    }

  }
})
