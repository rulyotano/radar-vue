<template>
    <div>
        <div v-if="place">
            <div class="details-w">
                <i class="verify abs fa fa-check" title="Verificado" v-if="place.Verified"></i>

                <DivImage class="media-i details-img" :class="{'no-img small' : !placeImageKey}"
                    :imageKey="placeImageKey" imageVersion="small">
                </DivImage>

                <div class="details-b">
                    <h1 class="event-d-title m-10-bottom">{{place.Name }}</h1>

                    <p class="detail-txt">{{fullAddress}}</p>

                    <div class="custom-ctn" v-html="place.Content"></div>

                    <div class="event-i-f">
                        <button class="login-social Facebook pull-left" title="Compartir en Facebook" @click="share()"><i class="fa fa-facebook"></i></button>
                                
                        <a class="contact-email" v-if="email" :href="'mailto:'+email+'?Subject=Radar!'" target="_blank">{{email}}</a>
                        <span class="contact-phone" v-if="phone1">{{phone1}}</span>
                        <a class="contact-email" v-if="pageUrl" :href="pageUrl" target="_blank">{{pageUrl}}</a>
                    </div>
                </div>
            </div>

            <h2 class="stn-s-lb">Próximos eventos en <strong>{{place.Name}}</strong>

                
                <!-- <a target="_self" class="edit-link" href="/Account/Login?ReturnUrl=%2Fadmin%2F%23%2Fcrear-evento?place={{::place.Id}}">(agregar evento)</a> -->
                
                <span v-if="totalEvents" class="stb-s-lb-r">{{totalEvents}} Resultados </span>
            </h2>

            <EventList :events="events" :placeId="place.Id" :eventsAdd="lastPage"/>

            <ViewMoreButton v-if="!lastPage && !loadingMore" @click="loadMoreEvents()"/>
            <Loading :loading="loadingMore"/>

        </div>

        <div class="error-w" v-if="!place">
            <p class="error-number">404</p>
            <p class="warning-text">Lo sentimos, el lugar no existe o ha sido eliminado</p>
            <nuxt-link class="link-text" to="/">Haga click aquí para ir al inicio</nuxt-link>
        </div>
    </div>
</template>

<script>
    import DivImage from '~/components/common/image/DivImage.vue'
    import radarPlaceService from '~/services/radar-place-service'
    import EventList from '~/components/events-list/EventList.vue'
    import imagesService from '~/services/images-service'
    import seoService from '~/services/seo-service'
    import ViewMoreButton from '~/components/common/ViewMoreButton.vue'
    import Loading from '~/components/common/Loading.vue'
    import _ from 'lodash'
    export default {
        components:{ DivImage, EventList, ViewMoreButton, Loading },
        head(){
            let meta = []
            let desc = ""
            if (this.place && this.place.Content)
                desc = _.truncate(this.place.Content, { 'length': 160, })
            if (desc){
                meta.push({ hid: 'description', id:"mDescription", name: 'description', content: desc })
                meta.push({ hid: 'faDescription', id: 'faDescription', property: 'og:description', content: desc })
            }
            if (this.placeImageKey){
                let imgUrl = imagesService.imageUrl(this.placeImageKey)
                meta.push({ hid: 'faImage', id: 'faImage', property: 'og:image', content: imgUrl })
            }
            if (this.place && this.place.Name){
                meta.push({ hid: 'faTitle', id: 'faTitle', property: 'og:title', content: this.place.Name })
            }

            return {
                title: this.place && this.place.Name ? `Radar - ${this.place.Name}` : seoService.DEFAULT_TITLE,
                meta
            }
        },
        computed:{
            placeImageKey(){
                return _.get(this.place, "Image.Key")                    
            },
            email(){
                return _.get(this.place, "ContactInfo.Email")
            },
            phone1(){
                return _.get(this.place, "ContactInfo.Phone1")
            },
            pageUrl(){
                return _.get(this.place, "ContactInfo.PageUrl")
            },
            fullAddress(){
                return this.place ? radarPlaceService.getFullAddress(this.place) : ""
            },
            totalEvents(){
                return _.get(this.place, "TotalEvents")
            },
            place(){ return this.$store.state.placeDetailsData.place },
            events(){ return this.$store.state.placeDetailsData.events },
            lastPage(){ return this.$store.state.placeDetailsData.lastPage },
            loadingMore(){ return this.$store.state.placeDetailsData.loadingMore }
        },
        methods:{
            share(){
                console.log("share")
            },
            loadMoreEvents(){
                this.$store.dispatch('loadMoreEventsPlace', this.place.Id)                
            }
        }
    }
</script>

<style scoped>

</style>