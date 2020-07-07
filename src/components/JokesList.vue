<template>
    <div class="jokes-list">
        <JokesItem class="jokes-list__item" v-for="joke in jokes" :item="joke" :key="joke.id" :isFavorite="isFavorite"></JokesItem>
    </div>
</template>

<script>
import JokesItem from '@/components/JokesItem.vue';

export default {
    components: {
        JokesItem
    },
    props: {
        jokes: {
            type: Array,
            required: true
        },
        isFavorite: {
            type: Boolean
        }
    }
}
</script>