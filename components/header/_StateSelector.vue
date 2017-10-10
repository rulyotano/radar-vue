<template>
    <div>
        <button type="button"
                class="navbar-toggle n-collapsed"
                :class="{ 'expanded': open }"
                @click="setOpen(!open)">
            <i class="n-i-collapsed fa fa-bars"/>
            <i class="n-i-expanded">&times;</i>
        </button>

        <div class="navbar-h-select show-collapse">
            <select class="form-control"
                    name="repeatSelect"
                    :value="selectedValue"
                    @change="selectState($event.target.value)">
                <option v-for="s in states" :key="s.shortname" :value="s.id || ''">{{s.shortName}}</option>
            </select>
            <i class="fa fa-caret-down"/>
        </div>
    </div>
</template>

<script>
    import radarStatesService from '~/services/radar-states-service'
    import {SET_MENU_OPEN} from '~/store/mutation-types'
    import { mapState, mapMutations } from 'vuex'
    import filtersService from '~/services/filters-service'
    import _ from 'lodash'

    export default {
        data(){
            return {
            }
        },
        computed:{
            ...mapState({
                selectedValue: (state)=> _.get(state, 'filters.loc'),
                open: 'menuOpen'
            }),
            states: ()=> radarStatesService.states,
            selectedState(){
                let selectedValue = this.selectedValue || null
                return _.find(this.states, s=> s.id == selectedValue) || {}
            }
        },
        methods:{
            selectState(stateId){
                filtersService.setFilters(this.$router, { loc: stateId || undefined })                
            },
            ...mapMutations({
                setOpen: SET_MENU_OPEN
            })
        }        
    }
</script>

<style scoped>

</style>