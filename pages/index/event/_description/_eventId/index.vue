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
                eventId: this.$route.params.eventId,
                event: null                
            }
        },
        fetch({store, params}){
            let self = this;
            return radarEventsService.details(params.eventId)
                .then(event=>self.event = event)
        }
    }
</script>

<style scoped>

</style>