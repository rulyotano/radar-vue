<template>
    <div>
        <EventsDetails :event="event"/>
    </div>
</template>

<script>
    import EventsDetails from '~/components/events-detail/EventsDetails.vue'
    import radarEventsService from '~/services/radar-events-service'
    import helperService from '~/services/helper-service'
    import { SET_EVENT_DETAILS } from '~/store/mutation-types'
    export default {
        components: {EventsDetails},
        validate ({ params }) {
            let validParams = helperService.validateParamsGuid(params.eventId, params.description)
            // Must be a number
            return !!validParams.id
        },        
        computed:{
            event(){ return this.$store.state.eventDetailsData.event }
        },
        fetch({store, params}){
            let validParams = helperService.validateParamsGuid(params.eventId, params.description)
            return radarEventsService.details(validParams.id)
                .then(event=>store.commit(SET_EVENT_DETAILS, event))
        }
    }
</script>

<style scoped>

</style>