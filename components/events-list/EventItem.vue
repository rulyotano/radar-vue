<template>
    <div>

    </div>
</template>

<script>
    import radarEventsService from '~/services/radar-events-service'
    import dateService from '~/services/date-service'

    export default {
        props: ['event'],
        computed: {
            date: dateService.fromServerDate(this.event.DateTime).format(dateService.formats.EVENT_DISPLAY_DATE_TIME),
            displayImage: radarEventsService.getImage(this.event),
            urlDescription: radarEventsService.urlDescription(this.event)
        }        
    }
</script>

<style scoped>

</style>