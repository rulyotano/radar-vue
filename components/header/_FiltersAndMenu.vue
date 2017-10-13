<template>
    <ul class="nav navbar-nav">  
        <StateSelectorDropDown/>     

        
        <li v-for="cat in categories" :key="cat.Id || 0" class="hidden-collapse">
            <a class="m-navbar-i" :class="{'active': cat.Id == category}"
                    @click="selectCategory(cat.Id)">
               {{cat.Name}}
            </a>
        </li>

        <li class="hidden-collapse search-row-h">
            <TextFilter/>
        </li>

    </ul>
</template>

<script>
    import StateSelectorDropDown from '~/components/header/_StateSelectorDropDown.vue'
    import TextFilter from '~/components/header/_TextFilter.vue'
    import { mapState } from 'vuex'
    import radarCategoriesService from '~/services/radar-categories-service'
    import filtersService from '~/services/filters-service'    
    import _ from 'lodash'

    export default {
        components:{ StateSelectorDropDown, TextFilter },
        computed:{
            ...mapState({
                category: (state)=> _.get(state, 'filters.cat')
            }),
            categories: ()=> radarCategoriesService.categories
        },
        methods:{
            selectCategory(id){
                filtersService.setFilters(this.$router, this.$route, { cat: id || undefined })                
            }
        }         
    }
</script>

<style scoped>

</style>