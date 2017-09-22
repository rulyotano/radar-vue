<template>
    <div>

      <nuxt-link to="/">Back to home</nuxt-link>      

      Place Details
    </div>
</template>

<script>
    export default {
        validate ({ params }) {
            // Must be a number
            return !!params.placeId
        }        
    }
</script>

<style scoped>

</style>