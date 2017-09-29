<template>
    <div>
        <PlacesDetail :place="place"/>
    </div>
</template>

<script>
    import PlacesDetail from '~/components/places-detail/PlacesDetail.vue'
    import radarPlaceService from '~/services/radar-place-service'
    export default {
        components: { PlacesDetail },
        validate ({ params }) {
            // Must be a number
            return !!params.placeId
        }, 
        computed:{
            place(){ return this.$store.state.placeDetailsData.place }
        },
        fetch({store, params}){
            return radarPlaceService.details(params.placeId)
                .then(place=>store.commit("setPlaceDetails", place))
        }     
    }
</script>

<style scoped>

</style>