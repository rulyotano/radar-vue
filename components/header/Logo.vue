<template>
    <div class="navbar-header">        
        <StateSelector/>

        <nuxt-link to="/" class="logo"><img src="~/assets/img/logo.png" alt="Radar"/><span class="beta">BETA</span></nuxt-link>
    </div>
</template>

<script>
    import StateSelector from './_StateSelector.vue'
    export default {
        components: {
            StateSelector
        }    
        
    }
</script>

<style scoped>

</style>