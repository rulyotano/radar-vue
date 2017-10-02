<template>
    <div>
        <ArtistsDetail :artist="artist"/>
    </div>
</template>

<script>
    import ArtistsDetail from '~/components/artists-detail/ArtistsDetail.vue'
    import radarArtistService from '~/services/radar-artist-service'
    import helperService from '~/services/helper-service'
    export default {
        components: { ArtistsDetail },
        validate ({ params }) {
            let validParams = helperService.validateParamsInt(params.artistId, params.description)
            // Must be a number
            return !!validParams.id
        },        
        computed:{
            artist(){ return this.$store.state.artistDetailsData.artist }
        },
        fetch({store, params}){
            let validParams = helperService.validateParamsInt(params.artistId, params.description)
            return radarArtistService.details(validParams.id)
                .then(artist=>store.commit("setArtistDetails", artist))
        }
    }
</script>

<style scoped>

</style>