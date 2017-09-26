<template>
    <div>
        <p class="h-event-lb"><i class="star fa fa-star"></i> Eventos destacados</p>

        <div class="h-event m-10-bottom">
            <nuxt-link v-for="(item, index) in events" :key="item.Id" :to="'/event/'+item.NameSlug+'/'+item.Id" class="h-event-t"><span class="h-event-i">{{index + 1}} </span> {{item.Name}}</nuxt-link>
        </div>
    </div>
</template>

<script>
    import radarEventService from '~/services/radar-events-service'

    export default {     
        computed: {
            events() { return this.$store.state.hightlights.map(he=>({...he, NameSlug:radarEventService.urlDescription(he)})) } 
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>