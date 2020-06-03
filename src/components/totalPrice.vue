<template>
    <div class="total-price">Total Price: {{totalPrice}}</div>
</template>
<script>
export default {
    props: ['books'],
    computed:{
        totalPrice(){
            let totalPrice =  this.books.reduce((acc, book) => {
                acc += +book.price
                return acc
            }, 0)
            return `$ ${Math.floor(totalPrice)}`
        }
    }
}
</script>
