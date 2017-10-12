<template>
    <li class="hidden-collapse dropdown" :class="{'open': open}">
        <a class="m-navbar-i m-navbar-i-l dropdown-toggle" @click="open = !open">
            <span>{{selectedState ? selectedState.name : states[0].name}}</span>
            <i class="fa fa-caret-down"/>
        </a>

        <ul class="header-dropdown dropdown-menu">
            <li>
                <a v-for="s in states" :key="s.id" @click="selectState(s.id)">{{s.name}}</a>
            </li>
        </ul>
    </li>    
</template>

<script>
    import radarStatesService from '~/services/radar-states-service'
    import { mapState } from 'vuex'
    import filtersService from '~/services/filters-service'
    import _ from 'lodash'
    

    export default {
        data(){
            return {
                open: false
            }
        },
        computed:{
            ...mapState({
                selectedValue: (state)=> _.get(state, 'filters.loc')
            }),
            states: ()=> radarStatesService.states,
            selectedState(){
                let selectedValue = this.selectedValue || null
                return _.find(this.states, s=> s.id == selectedValue) || {}
            }
        },
        methods:{
            selectState(stateId){
                filtersService.setFilters(this.$router, this.$route, { loc: stateId || undefined })        
                this.open = false        
            }
        }  
    }
</script>

<style scoped>

</style>