<template>
    <div>
        <PlacesDetail/>
    </div>
</template>

<script>
    import PlacesDetail from '~/components/places-detail/PlacesDetail.vue'
    import radarPlaceService from '~/services/radar-place-service'
    import helperService from '~/services/helper-service'
    export default {
        components: { PlacesDetail },
        validate ({ params }) {
            let validParams = helperService.validateParamsGuid(params.placeId, params.description)
            // Must be a number
            return !!validParams.id
        }, 
        fetch({store, params}){
            let validParams = helperService.validateParamsGuid(params.placeId, params.description)
            return radarPlaceService.details(validParams.id)
                .then(place=>store.commit("setPlaceDetails", place))
        }     
    }
</script>

<style scoped>

</style>