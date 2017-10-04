<template>
    <div>
        <div class="ctn hidden-collapse">
            <ul class="filter-nav">
                
                <li v-for="(item, index) in dateOptions" :key="index">
                    <a class="filter-nav-i" 
                       :class="{'active' : dateFilter === item.key}"
                       @click="setDateFilter(item.key)">
                       {{item.name}}
                    </a>
                </li>

                <li class="filter-nav-i-t"/>
            </ul>

            <div class="clearfix"></div>
        </div>

        

        <h1 class="stn-lb">{{category.displayEvents}}<span class="stb-lb-r">{{ total + ' Resultados'}} </span></h1>

        <EventList :events="events" :loading="loading" :eventsAdd="!hasMoreEvents" :grouped="true"/>

        <ViewMoreButton v-if="hasMoreEvents && !loadingMore" @click="loadMoreEvents()"/>
        <Loading :loading="loadingMore"/>
    </div>
</template>

<script>
    import searchConstants from '~/services/search-constants-service'
    import radarCategoriesService from '~/services/radar-categories-service'
    import EventList from '~/components/events-list/EventList.vue'
    import ViewMoreButton from '~/components/common/ViewMoreButton.vue'
    import Loading from '~/components/common/Loading.vue'
    export default {
        components:{
            EventList, ViewMoreButton, Loading
        },
        data(){
            return {
                dateOptions: searchConstants.dateOptions()
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
            loadingMore(){ return this.$store.state.eventsData.loadingMore },            
            events() { return this.$store.state.eventsData.events } 
        },
        methods:{
            loadMoreEvents(){
                this.$store.dispatch("loadMoreEvents")
            },
            setDateFilter(date){
                // console.log(this.$router)
                // console.log(this.$route)
                this.$router.push({ query: {...this.$router.params, date } })
            }
        }        
    }
</script>

<style scoped>
</style>