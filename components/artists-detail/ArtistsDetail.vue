<template>
    <div>
        <div v-if="artist">
            <div class="details-w">
                <i class="verify abs fa fa-check" title="Verificado" v-if="artist.Verified"></i>

                <DivImage class="media-i details-img" :class="{'no-img small' : !artistImageKey}"
                    :imageKey="artistImageKey" imageVersion="small">
                </DivImage>

                <div class="details-b ext">
                    <h1 class="event-d-title m-10-bottom">{{artist.Name }}</h1>

                    <div class="custom-ctn" v-html="artist.Content"></div>

                    <div class="event-i-f">
                        <button class="login-social Facebook pull-left" title="Compartir en Facebook" @click="share()"><i class="fa fa-facebook"></i></button>
                    </div>
                </div>
            </div>

            <h2 class="stn-s-lb">Próximos eventos de <strong>{{artist.Name}}</strong>

                
                <!-- <a target="_self" class="edit-link" href="/Account/Login?ReturnUrl=%2Fadmin%2F%23%2Fcrear-evento?artist={{::artist.Id}}">(agregar evento)</a> -->
                
                <span v-if="totalEvents" class="stb-s-lb-r">{{totalEvents}} Resultados </span>
            </h2>

            <EventList :events="events" :artistId="artist.Id" :eventsAdd="lastPage"/>

            <ViewMoreButton v-if="!lastPage && !loadingMore" @click="loadMoreEvents()"/>
            <Loading :loading="loadingMore"/>

        </div>

        <div class="error-w" v-if="!artist">
            <p class="error-number">404</p>
            <p class="warning-text">Lo sentimos, el artista no existe o ha sido eliminado</p>
            <nuxt-link class="link-text" to="/">Haga click aquí para ir al inicio</nuxt-link>
        </div>
    </div>
</template>

<script>
    import DivImage from '~/components/common/image/DivImage.vue'
    import EventList from '~/components/events-list/EventList.vue'
    import imagesService from '~/services/images-service'
    import seoService from '~/services/seo-service'
    import _ from 'lodash'
    import ViewMoreButton from '~/components/common/ViewMoreButton.vue'
    import Loading from '~/components/common/Loading.vue'
    import { LOAD_MORE_EVENTS_ARTIST } from '~/store/action-types'
    export default {
        components:{ DivImage, EventList, ViewMoreButton, Loading },
        head(){
            let meta = []
            let desc = ""
            if (this.artist && this.artist.Content)
                desc = _.truncate(this.artist.Content, { 'length': 160, })
            if (desc){
                meta.push({ hid: 'description', id:"mDescription", name: 'description', content: desc })
                meta.push({ hid: 'faDescription', id: 'faDescription', property: 'og:description', content: desc })
            }
            if (this.artistImageKey){
                let imgUrl = imagesService.imageUrl(this.artistImageKey)
                meta.push({ hid: 'faImage', id: 'faImage', property: 'og:image', content: imgUrl })
            }
            if (this.artist && this.artist.Name){
                meta.push({ hid: 'faTitle', id: 'faTitle', property: 'og:title', content: this.artist.Name })
            }

            return {
                title: this.artist && this.artist.Name ? `Radar - ${this.artist.Name}` : seoService.DEFAULT_TITLE,
                meta
            }
        },
        computed:{
            artistImageKey(){
                return _.get(this.artist, "Image.Key")                    
            },
            events(){
                let events = _.get(this.artist, "Events")
                if (_.isEmpty(events))
                    return []
                return events
            },
            totalEvents(){
                return _.get(this.artist, "TotalEvents")
            },
            artist(){ return this.$store.state.artistDetailsData.artist },
            events(){ return this.$store.state.artistDetailsData.events },
            lastPage(){ return this.$store.state.artistDetailsData.lastPage },
            loadingMore(){ return this.$store.state.artistDetailsData.loadingMore }
        },
        methods:{
            share(){
                console.log("share")
            },
            loadMoreEvents(){
                this.$store.dispatch(LOAD_MORE_EVENTS_ARTIST, this.artist.Id)                
            }
        }
    }
</script>

<style scoped>

</style>