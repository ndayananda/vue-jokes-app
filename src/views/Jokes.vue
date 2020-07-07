<template>
    <div class="jokes">
        <div class="tabs is-hidden-desktop">
            <ul>
                <li :class="{'is-active': !isFavoriteTab}"><a @click="isFavoriteTab = false">Jokes</a></li>
                <li :class="{'is-active': isFavoriteTab}"><a @click="isFavoriteTab = true">Favorite</a></li>
            </ul>
        </div>
        <div class="jokes__list" :class="{'is-hidden-touch': isFavoriteTab}">
            <h2 class="jokes__list-title is-hidden-touch is-size-4 has-text-weight-medium">Jokes</h2>
            <JokesList  :jokes="jokes" />
        </div>
        <div class="jokes__list jokes__list--favorite" :class="{'is-hidden-touch': !isFavoriteTab}">
            <h2 class="jokes__list-title">
                <span class="is-hidden-touch is-size-4 has-text-weight-medium">Favorite</span>
                <div class="buttons has-addons">
                    <span class="mb-3">Random Joke:  </span>
                    <button class="button is-small" :class="{'is-selected is-success': checked}" @click="checked = true">On</button>
                    <button class="button is-small" :class="{'is-selected is-danger': !checked}" @click="checked = false">Off</button>
                </div>

            </h2>
            <template v-if="favorites.length">
                <JokesList :jokes="favorites" :isFavorite="isFavorite" />
            </template>
            <template v-else>
                <h4 class="jokes__favortie-empty-msg">No favorite jokes. Add jokes to fovorite list</h4>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'Vuex';
import JokesList from '@/components/JokesList.vue';
import { Actions } from '@/store';
import appConfig from '@/app.config';

export default {
    components: {
        JokesList
    },
    data() {
        return {
            checked: true,
            timer: 0,
            isFavoriteTab: false
        }
    },
    computed:{
        ...mapState('jokes', ['jokes', 'favorites']),
        isFavorite() {
            return Boolean(this.favorites.length)
        }
    },
    watch: {
        checked() {
            this.addRandomJokes();
        }
    },
    mounted() {
        this.$store.dispatch(Actions.GET_JOKES);
        this.$store.dispatch(Actions.GET_FAVORITE_JOKES);
        this.addRandomJokes();
    },
    methods: {
        addToFavorite() {
            this.$store.dispatch(Actions.ADD_TO_FAVORITE, {});
        },
        addRandomJokes() {
            clearInterval(this.timer);
            if(this.checked) {
                this.timer = setInterval(this.addToFavorite, appConfig.randomFavoriteTimer);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .jokes {
        @media (min-width: $L) {
            display: flex;
            flex-flow: row wrap;
        }
        &__list {
            @media (min-width: $L) {
                flex: 1 0 1px;
                padding: 0 20px 0 0;
            }

            &:last-child {
                padding: 0;
            }

            &-title {
                padding: 10px 15px;
                margin: 0 0 15px;
                display: flex;
                justify-content: space-between;
            }
        }
        &__title {
            text-align: center;
            padding: 10px 15px;
            margin: 0 0 25px;
            flex: 1 100%;
        }
        &__favortie-empty-msg {
            padding: 25px 0;
        }
        &__button-random {
            padding: 5px 10px;
            background: $primary;
            cursor: pointer;
            border: 1px solid darken($color: $primary, $amount: 10%);
            color: $white;
            font-size: 13px;
            border-radius: 3px;
            text-align: center;
            &--off {
                background: $accent;
                border-color: darken($color: $accent, $amount: 10%);
            }
        }
        &__button-checkbox {
            visibility: hidden;
            height: 0;
            line-height: 0;
            width: 0;
            margin: 0;
        }
    }

</style>