<template>
    <div>
        <p class="h-event-lb"><i class="star fa fa-star"></i> Eventos destacados</p>

        <div class="h-event m-10-bottom">
            <nuxt-link v-for="(item, index) in events" :key="item.Id" :to="'/event/'+item.Id+'/'+item.NameSlug" class="h-event-t"><span class="h-event-i">{{index + 1}} </span> {{item.Name}}</nuxt-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {     
        computed: {
            events() { return this.$store.state.hightlights } 
        }
    }
</script>

<style scoped>

</style>