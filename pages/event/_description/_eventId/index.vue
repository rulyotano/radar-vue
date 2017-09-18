<template>
    <div>

      <nuxt-link to="/">Back to home</nuxt-link>      

      Event Details {{eventId}}
    </div>
</template>

<script>
    export default {
        validate ({ params }) {
            // Must be a number
            return !!params.eventId
        },
        data: function () {
            return { eventId: this.$route.params.eventId }
        }
    }
</script>

<style scoped>

</style>