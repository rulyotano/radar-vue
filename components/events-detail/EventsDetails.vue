<template>
    <div>
        <div v-if="event && event.Id">
            <div class="event-d-stn">
                <i class="verify abs fa fa-check" v-if="event.Verified" title="Verificado"></i>

                <div class="event-meta">
                    <span class="event-past" v-if="isPast">EVENTO PASADO</span>
                    <span class="event-cancel" v-if="event.Status == 1">CANCELADO</span>
                </div>

                <DivImage class="media-i b-cut" :class="{'no-img no-img-e small' : !imageKey}"
                     :imageKey="imageKey" imageVersion="small"/>

                <div class="event-d-info">
                    <!-- <a class="edit-link" title="Editar evento" target="_self" ng-if="userInfo.Admin || userInfo.Id == event.Creator.Id" ng-href="/admin/#/event/edit/{{event.Id}}">(editar)</a> -->

                    <h1 class="event-d-title">
                        <i class="star fa fa-star" v-if="event.Highlight"></i> {{ event.Name }}
                    </h1>

                    <p class="event-d-aux">{{ dateTimeTxt }}<span v-show="event.Cover">{{ event.Cover }} {{ event.Currency.IsoCode}}</span></p>

                    <div class="event-r" v-if="hasReps">
                        <EventsDetailsRepetitions :repetitions="reps" :currentDateTimeLocal="repsRefDate"/>
                    </div>

                    <div class="event-d-txt">{{event.Resume}}</div>

                    <!-- <div class="event-i-f">
                        <div class="event-i-f-ctr" uib-dropdown>
                            <div uib-dropdown class="pull-left">
                                <button class="btn-ctr" title="Opciones" uib-dropdown-toggle><i class="fa fa-cog"></i></button>
                                <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                                    <li ng-hide="event.owner">
                                        <span title="Reportar" ng-click="reportEvent()">Reportar</span>
                                    </li>
                                    <li ng-if="event.owner">
                                        <span title="Delete" ng-click="remove($event,event.Id)">Eliminar</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div uib-dropdown class="pull-left">
                                <span class="btn-ctr" title="Compartir evento" uib-dropdown-toggle><i class="fa fa-share-square-o"></i></span>
                                <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                                    <li>
                                        <span title="Compartir en Facebook" ng-click="share()">Facebook</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="event-i-f-l">
                            <button class="login-social Facebook" title="Compartir en Facebook" ng-click="share()"><i class="fa fa-facebook"></i></button>
                        </div>
                    </div>-->
                </div> 

                <DivImage class="event-d-img" :class="{'no-img no-img-e' : !imageKey}"
                     :imageKey="imageKey" imageVersion="medium"/>
            </div>

            <div class="item-d">
                <DivImage class="item-d-img" :imageKey="placeImageKey" :class="{'no-img no-img-p' : !placeImageKey}"
                     imageVersion="small" :imageSource="placeImageSourceType">
                </DivImage>

                <div class="item-d-info">
                    <div class="row n-row">
                        <div class="col-sm-10">
                            <!-- <a class="edit-link" target="_self" title="Editar lugar" ng-if="userInfo.Admin || userInfo.Id == place.Creator.Id" ng-href="/admin/#/place/edit/{{::place.Id}}">(editar)</a> -->

                            <nuxt-link class="item-d-aux" :to="'/place/' + placeSlug + '/' + place.Id">
                                <span class="item-d-title">Lugar </span>| {{ place.Name }}
                            </nuxt-link>

                            <div class="item-d-txt">
                                {{place.Address}}
                                <span v-show="place.Municipality">, {{place.Municipality.Name}}</span>
                                <span v-show="place.State">, {{place.State.Name}}</span>
                                <span v-show="place.Country">, {{place.Country.Name}}</span>
                            </div>

                            <p class="contact-line" v-if="place && place.ContactInfo">
                                <a class="contact-email" v-if="place.ContactInfo.Email" :href="'mailto:'+place.ContactInfo.Email+'?Subject=Radar!'" target="_blank">{{place.ContactInfo.Email}}</a>
                                <span class="contact-phone" v-if="place.ContactInfo.Phone1">{{place.ContactInfo.Phone1}}</span>
                                <a class="contact-email" v-if="place.ContactInfo.PageUrl" :href="place.ContactInfo.PageUrl" target="_blank">{{place.ContactInfo.PageUrl}}</a>
                            </p>
                        </div>
                        <div class="col-sm-10 col-sm-offset-2" v-if="artists && artists.length">
                            <p class="item-d-aux item-d-a">
                                <span class="item-d-title">Artista</span>
                                <a v-for="art in artists" :key="art.Id" @click="selectArtist(art)">
                                    <strong v-if="art.Id === selectedCalc.Id">{{art.Name}}</strong>
                                    <span v-if="art.Id !== selectedCalc.Id">{{art.Name}}</span>
                                </a>
                            </p>
                        </div>
                    </div>

                    <DivImage v-if="artists && artists.length" class="item-d-img right"
                         :imageKey="selectedArtistImageKey"
                         :class="{'no-img no-img-a' : !selectedArtistImageKey }"
                         imageVersion="small" 
                         :imageSource="selectedArtistImageSourceType">

                        <div class="art-detail">
                            <nuxt-link :to="'/artist/' + selectedArtistSlug + '/' + selectedCalc.Id">ver detalles</nuxt-link>
                            <!-- <a target="_self" ng-if="userInfo.Admin || userInfo.Id == selected.Creator.Id" href="/admin/#/artist/edit/{{selected.Id}}">editar</a> -->
                        </div>

                    </DivImage>
                </div>
            </div>
        </div>

        <div class="error-w" v-if="!event">
            <p class="error-number">404</p>
            <p class="warning-text">Lo sentimos, el evento no existe o ha sido eliminado</p>
            <nuxt-link class="link-text" to="/">Haga click aquí para ir al inicio</nuxt-link>
        </div>
    </div>
</template>

<script>
    import DivImage from '~/components/common/image/DivImage.vue'
    import EventsDetailsRepetitions from '~/components/events-detail/EventsDetailsRepetitions.vue'
    import dateService from '~/services/date-service'
    import helperService from '~/services/helper-service'
    import seoService from '~/services/seo-service'
    import imagesService from '~/services/images-service'
    import _ from 'lodash'
    import moment from 'moment'

    export default {
        components:{
            DivImage, EventsDetailsRepetitions
        },
        data(){
            return {                
                selected: null
            }
        },
        props:["event"],
        head(){
            let meta = []
            let desc = ""
            let artistStr = ""
            if (this.event){
                let strItems = [];
                if (this.dateTimeTxt)
                    strItems.push(this.dateTimeTxt)
                if (this.event.Resume)
                    strItems.push(this.event.Resume)
                if (this.place)
                    strItems.push(this.place.Name)
                if (!_.isEmpty(this.artists)){
                    artistStr = helperService.joinStr(_.map(this.artists, art=>art.Name))
                    strItems.push(artistStr)
                }
                desc = helperService.joinStr(strItems, ' - ')
            }
            if (desc)
                meta.push({ hid: 'description', id:"mDescription", name: 'description', content: desc })
            if (this.firstImageKey){
                let imgUrl = imagesService.imageUrl(this.firstImageKey)
                meta.push({ hid: 'faImage', id: 'faImage', property: 'og:image', content: imgUrl })
            } 
            if (this.event && this.event.Name){
                meta.push({ hid: 'faTitle', id: 'faTitle', property: 'og:title', content: this.event.Name })
            }
            meta.push({ hid: 'faUrl', id: 'faUrl', property: 'og:url', content: `${process.env.apiUrl}${this.$route.path}`  })
            return {
                title: this.event && this.event.Name ? `Radar - ${this.event.Name}` : seoService.DEFAULT_TITLE,
                meta
            }
        },
        methods:{
            selectArtist(artist){
                if (this.artists && this.artists.length == 1) 
                    this.$router.push({ path: '/artist/' + helperService.urlDescription(artist.Name) + '/' + artist.Id })                
                else
                    this.selected = artist;
            }
        },
        watch:{
            event(newEvent){
                this.selected = null;
            }
        },
        computed:{
            reps(){
                let reps = _.get(this.event, "Repetitions")
                return  !reps ? [] : 
                    _(reps).sortBy("DateTimeLocal").map(r=>({
                        ...r,
                        DateTime: dateService.fromServerDate(r.DateTimeLocal),
                        DateTimeUtc: moment(r.DateTimeUtc) 
                    })).value()                
            },
            hasReps(){ return this.reps.length > 1 },
            activeDate(){
                if (!this.reps.length)
                    return {
                        DateTime: moment([1]),
                        DateTimeUtc: moment([1]),
                    }
                let result = _(this.reps).filter(r=>r.DateTimeUtc.isAfter()).head();
                return result ? result : _.head(this.reps)
            },
            isPast(){ return this.activeDate.DateTimeUtc.isBefore() },
            dateTimeTxt(){ return this.activeDate.DateTime.format(dateService.formats.EVENT_DISPLAY_DATE_TIME) },
            repsRefDate(){ return dateService.toServerDate(this.activeDate.DateTime) },
            place(){
                return this.event.Place
            },
            placeSlug(){
                return helperService.urlDescription(this.place.Name) 
            },
            artists(){
                return this.event.Artists
            },
            selectedCalc(){
                return this.selected || _.head(this.artists)
            },
            selectedArtistSlug(){
                return this.selectedCalc ? helperService.urlDescription(this.selectedCalc.Name) : ""
            },
            imageKey(){
                return _.get(this.event, "Image.Key") || ""
            },
            imageSourceType(){
                return _.get(this.event, "Image.SourceType")  || ""
            },
            placeImageKey(){
                return _.get(this.place, "Image.Key")
            },
            placeImageSourceType(){
                return _.get(this.place, "Image.SourceType")
            },
            imageSourceType(){
                return _.get(this.event, "Image.SourceType")
            },
            selectedArtistImageKey(){
                return _.get(this.selectedCalc, "Image.Key")
            },
            selectedArtistImageSourceType(){
                return _.get(this.selectedCalc, "Image.SourceType")
            },
            firstImageKey(){
                if (this.imageKey)
                    return this.imageKey;
                if (!_.isEmpty(this.artists)){
                    let artistImage = _(this.artists).filter(a=>a.Image && a.Image.Key).head()
                    if (artistImage)
                        return artistImage.Image.Key
                }
                return this.placeImageKey
            }
        }                   
    }
</script>

<style scoped>

</style>