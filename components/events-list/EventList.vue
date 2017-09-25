<template>
    <div v-if="!loading" class="row s-row">
        <EventItem v-for="item in events" :key="item.key" :event="item"/>
    </div>
</template>

<script>
    import EventItem from "~/components/events-list/EventItem.vue"
    
    export default {
        components:{
            EventItem
        },
        data(){
            return {
                loading: false
            }
        },
        computed:{
            events() { return this.$store.state.eventsData.events } 
        }        
    }
</script>

<style scoped>

</style>