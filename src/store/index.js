import Vue from 'vue'
import Vuex from 'vuex'
import booksService from '../js/booksService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    setBooks(state, {books}){
      state.books = books.data;

    }

  },
  actions: {
   async loadBooks(context){
      let books = await booksService.getBooks()
      context.commit({type: 'setBooks', books})
      return books
    }
  },
  modules: {
  },
  getters: {
    books(state){
      return state.books;
    }

  }
})
