<template>
<div v-if="book" class="flex">
    <div class="pagination-btn flex align-center" v-if="isDisplayPrev" @click="onMove(-1)"><</div>
    <div class="book-container">
        <div class="book-header flex space-between">
            <input @change="onAddToWishList(book.isWishList)" v-model="book.isWishList" type="checkbox">
            <div class="book-title">{{book.title}}</div>
        </div>
        <div class="book-author">{{book.author}}</div>
        <div>{{book.description}}</div>
        <div>${{book.price}}</div>
        <div>Rating:{{stars}}</div>
    </div>
    <div class="pagination-btn flex align-center" v-if="isDisplayNext" @click="onMove(+1)">></div>
</div>
</template>
<script>
export default {
    props: ['book', 'currBookIdx'],
    methods: {
        onMove(diff){
            this.$emit('moveBook', diff);
        },
        onAddToWishList(isChecked){
            this.$emit('addBook', isChecked)
        }
    },
    computed:{
        isDisplayPrev(){
            return this.currBookIdx >= 1;
        },
        isDisplayNext(){
            return this.currBookIdx >= 0 && this.currBookIdx < 10;
        },
        stars(){
            let starsStr = ''
            for(let i = 0; i < Math.floor(+this.book.rating); i++){
                starsStr += '⭐'
            }
            return starsStr;
        }
    }
}
</script>