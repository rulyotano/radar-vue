<template>
    <div>
        <ArtistsDetail :artist="artist"/>
    </div>
</template>

<script>
    import ArtistsDetail from '~/components/artists-detail/ArtistsDetail.vue'
    import radarArtistService from '~/services/radar-artist-service'
    import helperService from '~/services/helper-service'
    import { SET_ARTIST_DETAILS } from '~/store/mutation-types'
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
                .then(artist=>store.commit(SET_ARTIST_DETAILS, artist))
        }
    }
</script>

<style scoped>

</style>