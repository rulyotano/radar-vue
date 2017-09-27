<template>
    <div class="dropdown" :class="{'open': open}">
        <a class="event-r-btn dropdown-toggle" @click="open = !open">EVENTO REPETIDO</a>
        <ul class="dropdown-menu" aria-labelledby="simple-dropdown">
            <li v-for="item in repetitions" :key="item.DateTimeLocal">
                <a v-if="currentDateTimeLocal !== item.DateTimeLocal">{{timeFormat(item)}}</a>
                <a v-if="currentDateTimeLocal === item.DateTimeLocal" class="current">{{timeFormat(item)}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment'   
    import dateService from '~/services/date-service'
    export default {
        props: [ 'repetitions', 'currentDateTimeLocal' ],
        data(){
            return {
                open: false
            }
        },
        methods: {
            timeFormat(item){
                if (!item)
                    return ""
                return moment(item.DateTime).format(dateService.formats.EVENT_DISPLAY_DATE_FULL)
            }
        }        
    }
</script>

<style scoped>

</style>