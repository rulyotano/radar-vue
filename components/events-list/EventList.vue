<template>
    <div class="row s-row" v-if="!loading">
        <template v-for="group in groupedEvents">
            <div v-if="groupedEvents.length > 1" class="col-md-12 col-sm-12 h-event-t" :key="group.key">{{group.text}}</div>
            <EventItem v-for="event in group.items" :event="event" :key="event.Id" :imagePriority="imagePriority"/>
        </template>
        <div class="col-md-3 col-sm-4" v-if="eventsAdd">
            <a class="event-i-add" target="_blank" :href="createEventUrl" title="Crear evento"><i class="fa fa-plus"></i></a>
        </div>
    </div>
</template>

<script>
    import EventItem from '~/components/events-list/EventItem.vue'
    import httpService from '~/services/http-service'
    import dateService from '~/services/date-service'
    import moment from 'moment'
    import _ from 'lodash'
    export default {
        components: { EventItem },
        props: ["events", "artistId", "placeId", "eventsAdd", "loading"],
        computed:{
            createEventUrl(){
                return httpService.createEventUrl(this.artistId, this.placeId)
            },
            imagePriority(){
                return this.artistId ? 'place' : this.placeId ? 'artist' : null;
            },
            groupedEvents(){
                if (_.isEmpty(this.events))
                    return []
                let grouped = _.groupBy(this.events, e=>e.DateTime.substring(0, 8))
                let today = moment()
                let todayStr = today.format(dateService.formats.SERVER_DATE_ONLY_DATE)
                today = moment(todayStr, dateService.formats.SERVER_DATE_ONLY_DATE) //this step is for getting the start hour of today
                let result = []

                _.forEach(grouped, (items, key)=>{
                    let date = moment(key, dateService.formats.SERVER_DATE_ONLY_DATE);
                    let diff = date.diff(today, 'hours')        
                    let str = diff <= 23 ? 'hoy' :
                                diff < 24*7-1 ? date.format('dddd') :
                                date.year() == today.year() ?
                                date.format("Do MMMM") :            
                                date.format("YYYY, Do MMMM")           
                    result.push({
                        text: str,
                        key,
                        items
                    })
                })
                return _.orderBy(result, 'key')
            }
        }        
    }
</script>

<style scoped>

</style>