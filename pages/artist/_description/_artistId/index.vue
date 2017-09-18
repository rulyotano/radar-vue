<template>
    <div>

      <nuxt-link to="/">Back to home</nuxt-link>      

      Arist Details {{artistId}}
    </div>
</template>

<script>
    export default {
        validate ({ params }) {
            // Must be a number
            return !!params.artistId
        },
        data: function () {
            return { artistId: this.$route.params.artistId }
        }
    }
</script>

<style scoped>

</style>