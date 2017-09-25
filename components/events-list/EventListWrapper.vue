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

        

        <!-- <h1 class="stn-lb">{ category.displayEvents }<span class="stb-lb-r">{ loading ? 'Cargando ...' : (this.props.eventList.total + ' Resultados') } </span></h1> -->

        <!-- <EventListComponent/> -->
    </div>
</template>

<script>
    import searchConstants from '~/services/search-constants-service'
    export default {
        data(){
            return {
                dateFilter: this.$store.state.filters.date,
                dateOptions: searchConstants.dateOptions
            }
        }        
    }
</script>

<style scoped>

</style>