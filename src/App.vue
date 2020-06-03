<template>
<div class="flex container">
  <bookPreview 
  :book="currBook"
  :currBookIdx="currBookIdx"
  @moveBook="setIdx"
  @addBook="setBook">
  </bookPreview>
  <div class="wishlist-container flex column">
  <sorter @setSort="sort"></sorter>
  <wishList :books="booksForWishList"
            @removeFromWL="removeBook">
  </wishList>
  <totalPrice :books="booksForWishList"></totalPrice>
  </div>
</div>
</template>

<script>
import './style/main.css'
import bookService from './js/booksService.js'
import bookPreview from './components/bookPreview.vue'
import wishList from './components/wishList.vue'
import sorter from './components/sorter.vue'
import totalPrice from './components/totalPrice.vue'


export default {
  data(){
    return {
      currBookIdx: 0,
      books: [],
      currBook: null,
      booksForWishList: bookService.getBooksForWishList()
    }
  },
  methods:{
    setIdx(val){
      this.currBookIdx += val;
      this.currBook = this.books[this.currBookIdx]
    },
    setBook(isAdd){
      this.currBook.isWishList = isAdd;
      bookService.updateBook(this.currBookIdx,this.currBook);
      this.booksForWishList = bookService.getBooksForWishList();
    },
    removeBook(id, idx){
      this.booksForWishList.splice(idx, 1);
      let bookIdx = bookService.findIndexById(id);
      let book = this.books[bookIdx]
      book.isWishList = false;
      bookService.updateBook(bookIdx,book);
      
    },
    sort(sortBy){
      this.booksForWishList = bookService.sortWishList(sortBy, this.booksForWishList);
  
    }
  },
  async created() {
    let books = await bookService.getBooks();
    this.books = books
    this.currBook = this.books[this.currBookIdx]
  },
  components:{
    bookPreview,
    wishList,
    sorter,
    totalPrice
  }
}
</script>

