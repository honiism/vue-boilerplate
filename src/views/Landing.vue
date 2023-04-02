<template>
    <h1 class="heading">Hey!</h1>
    <img src="../assets/images/website_icon.png">
    <Footer />
</template>

<style scoped lang="scss">
    @import "../styles/landing.scss";
</style>

<script setup>
    import { gsap } from '../js/vendor'
    import Footer from '../components/Footer.vue'

    const props = defineProps({
        viewport: Object
    })
</script>