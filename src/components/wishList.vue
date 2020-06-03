<template>
<div>
    <div class="wishlist-book flex space-between" :key="book.title" v-for="(book, index) in books">
        <div>{{book.title}}</div>
        <button class="book-btn" @click="emitDelete(book.id, index)">X</button>
    </div>
</div>
</template>
<script>

export default {
    props: ['books'],
    methods: {
        emitDelete(id, idx){
            this.$emit('removeFromWL', id, idx)
        }
    }
}
</script>