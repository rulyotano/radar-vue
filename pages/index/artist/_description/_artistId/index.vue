<template>
    <div>
        <ArtistsDetail :artist="artist"/>
    </div>
</template>

<script>
    import ArtistsDetail from '~/components/artists-detail/ArtistsDetail.vue'
    import radarArtistService from '~/services/radar-artist-service'
    export default {
        components: { ArtistsDetail },
        validate ({ params }) {
            // Must be a number
            return !!params.artistId
        },
        data: function () {
            return { artistId: this.$route.params.artistId }
        },
        computed:{
            artist(){ return this.$store.state.artistDetailsData.artist }
        },
        fetch({store, params}){
            return radarArtistService.details(params.artistId)
                .then(artist=>store.commit("setArtistDetails", artist))
        }
    }
</script>

<style scoped>

</style>