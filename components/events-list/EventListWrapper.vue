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

        <EventList/>
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
                dateOptions: searchConstants.dateOptions,
                loading: false
            }
        },
        computed: {
            dateFilter(){ return this.$store.state.filters.date },
            total(){ return this.$store.state.eventsData.total },
            category(){ return !this.$store.state.filters.cat ? 
                            radarCategoriesService.categoriesMap[null] : 
                            radarCategoriesService.categoriesMap[this.$store.state.filters.cat] }
        }        
    }
</script>

<style scoped>

</style>