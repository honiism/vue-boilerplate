<template>
    <router-view :viewport="viewport"/>
</template>

<script setup>
    import './styles/app.scss' // global styles
    import { onMounted, ref } from 'vue'

    const viewport = ref({
        w: window.innerWidth,
        h: window.innerHeight,
        isMin480: window.innerWidth >= 480,
        isMin580: window.innerWidth >= 580,
        isMin768: window.innerWidth >= 768,  // tablet+
        isMin850: window.innerWidth >= 850,
        isMin1000: window.innerWidth >= 1000,
        isMin1150: window.innerWidth >= 1150,
        isMax480: window.innerWidth <= 480,
        isMax580: window.innerWidth <= 580,
        isMax768: window.innerWidth <= 768,  // tablet+
        isMax850: window.innerWidth <= 850,
        isMax1000: window.innerWidth <= 1000,
        isMax1150: window.innerWidth <= 1150
    })

    function updateViewport() {
        viewport.value = {
            w: window.innerWidth,
            h: window.innerHeight,
            isMin480: window.innerWidth >= 480,
            isMin580: window.innerWidth >= 580,
            isMin768: window.innerWidth >= 768,  // tablet+
            isMin850: window.innerWidth >= 850,
            isMin1000: window.innerWidth >= 1000,
            isMin1150: window.innerWidth >= 1150,
            isMax480: window.innerWidth <= 480,
            isMax580: window.innerWidth <= 580,
            isMax768: window.innerWidth <= 768,  // tablet+
            isMax850: window.innerWidth <= 850,
            isMax1000: window.innerWidth <= 1000,
            isMax1150: window.innerWidth <= 1150
        }
    }

    onMounted(() => {
        window.addEventListener('resize', updateViewport)
    })
</script>