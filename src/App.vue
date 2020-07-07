<template>
    <div class="jokes-app">
        <Header />
        <section class="section">
            <div class="container">
                <RouterView />
            </div>
        </section>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
@import './../node_modules/bulma/css/bulma.css';
@import './scss/reset';
@import './scss/global.scss';
</style>