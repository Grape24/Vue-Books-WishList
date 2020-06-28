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
  methods:{
    setIdx(val){
      this.$store.dispatch('setIdx', val)
    },
    setBook(isAdd){
      this.$store.dispatch('toggleAdd', isAdd)
    },
    removeBook(id, idx){
      this.$store.dispatch('removeBookFromWL', id)
    },
    sort(sortBy){
      this.$store.dispatch('sortWL', sortBy);
  
    }
  },
  async created() {
    this.$store.dispatch('loadBooks')
    
  },
  computed:{
    booksForWishList() {
      return this.$store.getters.booksForWishList;
    },
    books(){
      return this.$store.getters.books;
    },
    currBook(){
      return this.$store.getters.books[this.$store.getters.currIdx];
    },
    currBookIdx(){
      return this.$store.getters.currIdx;
    }

  },
  components:{
    bookPreview,
    wishList,
    sorter,
    totalPrice
  }
}
</script>

