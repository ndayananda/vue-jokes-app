<template>
    <div class="jokes-item" id="item.id" :class="{'jokes-item--favorite': isFavorite}">
        {{ item.joke }}
        <button class="jokes-item__favorite-button" aria-label="ariaLabel" @click="toggleFavorite">
            <template v-if="isFavorite">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" width="16" height="16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
            </template>
            <template v-else>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart"  width="16" height="16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
            </template>
        </button>
    </div>
</template>

<script>
import { Actions } from '@/store';
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        isFavorite: {
            type: Boolean
        }
    },
    computed: {
        ariaLabel() {
            return this.isFavorite ? 'Remove joke from favorite' : 'Mark the joke as favorite'
        }
    },
    methods: {
        toggleFavorite() {
            this.$store.dispatch(this.isFavorite ? Actions.REMOVE_FAVORITE : Actions.ADD_TO_FAVORITE, {id: this.item.id});
        }
    }
}
</script>

<style lang="scss" scoped>
    .jokes-item {
        padding: 10px 35px 10px 15px;
        margin-bottom: 20px;
        border: 1px solid lighten($color: $black, $amount: 80%);
        border-radius: 3px;
        position: relative;

        &--favorite {
            border-color: $accent;

            .jokes-item__favorite-button {
                color: lighten($color: $black, $amount: 60%);
            }
        }

        &:hover:not(&--favorite) {
            border-color: $primary;
        }

        &__favorite-button {
            background: transparent;
            width: 30px;
            height: 30px;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $primary;
            outline: none;

            &:hover {
                color: darken($color: $primary, $amount: 20%);
            }
        }
    }
</style>