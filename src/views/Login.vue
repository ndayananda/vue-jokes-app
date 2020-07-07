<template>
    <div class="login">
        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <form class="login__form">
                    <h1 class="login__form-title is-size-4 pb-2">Login</h1>
                    <div class="login__error-msg" v-if="err.length">{{ err }}</div>
                    <div class="field">
                        <label class="label">Username/Email</label>
                        <div class="control">
                            <input class="input login__form-email-input" type="text" v-model="username"
                                placeholder="Your username or e-mail address"
                                @blur="validateUserName"
                                :class="{
                                    'is-danger': isUserNameInvalid,
                                    'is-success': !isUserNameInvalid
                                    }">
                        </div>
                        <p class="login__form-email-error help is-danger" :class="{'is-hidden': !isUserNameInvalid }">This username/email is invalid</p>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input login__form-password-input" type="password" v-model="password" placeholder="Password"
                                @blur="validatePassword"
                                :class="{
                                    'is-danger': isPasswordInvalid,
                                    'is-success': !isPasswordInvalid
                                }">
                        </div>
                        <p class="login__form-password-error help is-danger" :class="{'is-hidden': !isPasswordInvalid }" v-for="error in passwordErrors" :key="error.errorMsg">{{ error.errorMsg }}</p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" :class="{'login__form-button--disabled': isInvalid}" :disabled="isInvalid" @click="loginClickhandler">Login</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <BaseLoader :is-active="loginProgress" />
    </div>
</template>

<script>
import { Actions } from '@/store';
import BaseLoader from '@/components/shared/BaseLoader.vue';

const validationRules = [{
        errorMsg: 'Passwords must include one increasing straight of at least three letters, like "abc", "cde", "fgh"',
        regexp: /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/
    }, {
        errorMsg: 'Passwords may not contain the letters i, O, or l',
        regexp: /^[^i^o^l]+$/
    }, {
        errorMsg: 'Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc',
        regexp: /[a-z]*([a-z])\1([a-z])+/
    }, {
        errorMsg: 'Passwords cannot be longer than 32 characters',
        regexp: /^\w{1,32}$/
    }];

export default {
    components: {
        BaseLoader
    },
    data() {
        return {
            username: '',
            password: '',
            loginProgress: false,
            err: '',
            isUserNameInvalid: false,
            isPasswordInvalid: false,
            passwordErrors: []
        };
    },
    computed: {
        isInvalid() {
            return this.isUserNameInvalid || this.isPasswordInvalid || Boolean(!this.username) || Boolean(!this.password);
        }
    },
    methods: {
        async loginClickhandler(event) {
            event.preventDefault();
            this.loginProgress = true;
            this.err = '';
            try {
                await this.$store.dispatch(Actions.LOGIN, {username: this.username, password: this.password});
                this.loginProgress = false;
                this.$router.push('/jokes');
            }
            catch(err) {
                this.err = 'Login failed. Please check the Username & Password';
                this.loginProgress = false;
            }
        },
        validateUserName() {
            this.isUserNameInvalid =  !(/^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/.test(this.username));
        },
        validatePassword() {
            const errors = validationRules.filter((item)=> !item.regexp.test(this.password));
            this.isPasswordInvalid = Boolean(errors.length);
            this.passwordErrors = errors.length ? errors : [];
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    min-height: calc(100vh - 230px);

    &__form {
        padding: 15px 25px;

        &-title {
            border-bottom: 1px solid lighten($color: $black, $amount: 95%);
            margin-bottom: 25px;
        }
    }
    &__error-msg {
        margin: 0 0 15px;
        font-size: 14px;
        color: $error;
    }
}
</style>