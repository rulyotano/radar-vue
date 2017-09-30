<template>
    <div class="row s-row" v-if="!loading">
        <EventItem :event="event" v-for="event in events" :key="event.Id" :imagePriority="imagePriority"/>
        <div class="col-md-3 col-sm-4" v-if="eventsAdd">
            <a class="event-i-add" target="_blank" :href="createEventUrl" title="Crear evento"><i class="fa fa-plus"></i></a>
        </div>
    </div>
</template>

<script>
    import EventItem from '~/components/events-list/EventItem.vue'
    import httpService from '~/services/http-service'
    export default {
        components: { EventItem },
        props: ["events", "artistId", "placeId", "eventsAdd", "loading"],
        computed:{
            createEventUrl(){
                return httpService.createEventUrl(this.artistId, this.placeId)
            },
            imagePriority(){
                return this.artistId ? 'place' : this.placeId ? 'artist' : null;
            }
        }        
    }
</script>

<style scoped>

</style>