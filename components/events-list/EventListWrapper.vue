<template>
    <div>
        <div class="ctn hidden-collapse">
            <ul class="filter-nav">
                
                <li v-for="(item, index) in dateOptions" :key="index">
                    <a class="filter-nav-i" :class="{'active' : dateFilter === item.key}">{{item.name}}</a>
                </li>

                <li class="filter-nav-i-t"/>
            </ul>

            <div class="clearfix"></div>
        </div>

        

        <h1 class="stn-lb">{{category.displayEvents}}<span class="stb-lb-r">{{ total + ' Resultados'}} </span></h1>

        <EventList :events="events" :loading="loading"/>

        <button class="btn-m btn-primary btn-block add-button" v-if="hasMoreEvents" @click="loadMoreEvents()">Ver Más</button>        
    </div>
</template>

<script>
    import searchConstants from '~/services/search-constants-service'
    import radarCategoriesService from '~/services/radar-categories-service'
    import EventList from '~/components/events-list/EventList.vue'
    export default {
        components:{
            EventList
        },
        data(){
            return {
                dateOptions: searchConstants.dateOptions
            }
        },
        computed: {
            dateFilter(){ return this.$store.state.filters.date },
            total(){ return this.$store.state.eventsData.total },
            category(){ return !this.$store.state.filters.cat ? 
                            radarCategoriesService.categoriesMap[null] : 
                            radarCategoriesService.categoriesMap[this.$store.state.filters.cat] },
            hasMoreEvents(){ return !this.$store.state.eventsData.lastPage },            
            loading(){ return this.$store.state.eventsData.loading },            
            events() { return this.$store.state.eventsData.events } 
        },
        methods:{
            loadMoreEvents(){
                this.$store.dispatch("loadMoreEvents")
            }
        }        
    }
</script>

<style scoped>
.add-button{
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 20px;
}



</style>