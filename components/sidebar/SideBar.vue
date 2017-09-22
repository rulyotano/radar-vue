<template>
    <div>
        <div v-if="!isMobile" class="publi-banner roba">
            <img src="~/assets/img/mocks/publi.jpg" alt="Radar-Sidebar"/>
        </div>
        <div class="likes-box">
            <div class="fb-like" data-href="https://www.facebook.com/enelradar/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
        </div>
        <div>
            <HightlightEvents v-if="!isMobile"/>
        </div>
    </div>
</template>

<script>
    import HightlightEvents from './HightlightEvents.vue'
    export default {
        components:{
            HightlightEvents
        },
        data () {
            return {isMobile: this.$store.state.isMobile}
        }
    }
</script>

<style scoped>

</style>