<template>
    <nav class="bd-navbar navbar has-shadow" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item is-size-3" href="/">Vue Jokes App</a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
                        <a class="navbar-link">{{ fullName }}</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item" @click="onLogoutClick">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';
import { Actions } from '@/store';

export default {
    computed: {
        ...mapState('auth', ['user']),
        fullName() {
            return `${this.user.firstname} ${this.user.lastname}`
        },
        isAuthenticated() {
            return Boolean(Object.entries(this.user).length);
        }
    },
    methods: {
        async onLogoutClick() {
            await this.$store.dispatch(Actions.LOGOUT).catch(err => {
                console.error('Unable to logout');
                return;
            });
            this.$router.push('/login');
        }
    }
}
</script>