<template>
    <div>
        <button :class="{'selected': isSelected === 'title'}" class="sorter-btn" @click="emitSort('title')">title</button>
        <button :class="{'selected': isSelected === 'price'}" class="sorter-btn" @click="emitSort('price')">price</button>
        <button :class="{'selected': isSelected === 'rating'}" class="sorter-btn" @click="emitSort('rating')">rating</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isSelected: ''
        }
    },
    methods: {
        emitSort(sortBy){
            this.$emit('setSort', sortBy)
            this.isSelected = sortBy;
        }
    },

}
</script>