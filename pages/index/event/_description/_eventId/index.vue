<template>
    <div>
        <EventsDetails :event="event"/>
    </div>
</template>

<script>
    import EventsDetails from '~/components/events-detail/EventsDetails.vue'
    import radarEventsService from '~/services/radar-events-service'
    export default {
        components: {EventsDetails},
        validate ({ params }) {
            // Must be a number
            return !!params.eventId
        },
        data: function () {
            return { 
                eventId: this.$route.params.eventId
            }
        },
        computed:{
            event(){ return this.$store.state.eventDetailsData.event }
        },
        fetch({store, params}){
            return radarEventsService.details(params.eventId)
                .then(event=>store.commit("setEventDetails", event))
        }
    }
</script>

<style scoped>

</style>