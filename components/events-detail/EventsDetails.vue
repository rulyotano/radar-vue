<template>
    <div>
        <div v-if="event && event.Id">
            <div class="event-d-stn">
                <i class="verify abs fa fa-check" v-if="event.Verified" title="Verificado"></i>

                <div class="event-meta">
                    <span class="event-past" v-if="isPast">EVENTO PASADO</span>
                    <span class="event-cancel" v-if="event.Status == 1">CANCELADO</span>
                </div>

                <DivImage class="media-i b-cut" :class="{'no-img no-img-e small' : !event.Image.Key}"
                     :imageKey="event.Image.Key" imageVersion="small">
                </DivImage>

                <div class="event-d-info">
                    <!-- <a class="edit-link" title="Editar evento" target="_self" ng-if="userInfo.Admin || userInfo.Id == event.Creator.Id" ng-href="/admin/#/event/edit/{{event.Id}}">(editar)</a> -->

                    <h1 class="event-d-title">
                        <i class="star fa fa-star" v-if="event.Highlight"></i> {{ event.Name }}
                    </h1>

                    <p class="event-d-aux">{{ dateTimeTxt }}<span v-show="event.Cover">{{ event.Cover }} {{ event.Currency.IsoCode}}</span></p>

                    <div class="event-r" v-if="hasReps">
                        <show-repetition repetitions="event.Repetitions" current-date-time-local="currentDateTimeLocal"></show-repetition>
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

                <DivImage class="event-d-img" :class="{'no-img no-img-e' : !event.Image.Key}"
                     :imageKey="event.Image.Key"
                     imageVersion="medium" :imageSource="event.Image.SourceType">
                </DivImage>
            </div>

            <div class="item-d">
                <DivImage class="item-d-img" :imageKey="place.Image.Key" :class="{'no-img no-img-p' : !place.Image.Key}"
                     imageVersion="small" :imageSource="place.Image.SourceType">
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

                            <p class="contact-line">
                                <a class="contact-email" v-if="place.ContactInfo.Email" :href="'mailto:'+place.ContactInfo.Email+'?Subject=Radar!'" target="_blank">{{place.ContactInfo.Email}}</a>
                                <span class="contact-phone" v-if="place.ContactInfo.Phone1">{{place.ContactInfo.Phone1}}</span>
                                <a class="contact-email" v-if="place.ContactInfo.PageUrl" :href="place.ContactInfo.PageUrl" target="_blank">{{place.ContactInfo.PageUrl}}</a>
                            </p>
                        </div>
                        <div class="col-sm-10 col-sm-offset-2" v-show="artists && artists.length">
                            <p class="item-d-aux item-d-a">
                                <span class="item-d-title">Artista</span>
                                <a v-for="art in artists" :key="art.Id" @click="selectArtist(art)">
                                    <strong v-if="art.Id === selected.Id">{{art.Name}}</strong>
                                    <span v-if="art.Id !== selected.Id">{{art.Name}}</span>
                                </a>
                            </p>
                        </div>
                    </div>

                    <DivImage v-show="artists && artists.length" class="item-d-img right"
                         :imageKey="selected && selected.Image ? selected.Image.Key : null"
                         :class="{'no-img no-img-a' : !selected || !selected.Image || !selected.Image.Key }"
                         imageVersion="small" 
                         :imageSource="selected && selected.Image ? selected.Image.SourceType : null">

                        <div class="art-detail">
                            <nuxt-link :to="'/artist/' + selectedArtistSlug + '/' + selected.Id">ver detalles</nuxt-link>
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
    import dateService from '~/services/date-service'
    import helperService from '~/services/helper-service'
    import _ from 'lodash'
    import moment from 'moment'

    export default {
        comments:{
            DivImage
        },
        data(){
            return {                
                selected: null
            }
        },
        props:["event"],
        methods:{
            selectArtist(artist){
                if (this.artists && this.artists.length == 1) {
                    this.$router.push({ path: '/artist/' + helperService.urlDescription(artist.Name) + '/' + artist.Id })
                }
                else
                    this.selected = artist;
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
            hasReps(){ return reps.length > 1 },
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
            selectedArtistSlug(){
                return this.selected ? helperService.urlDescription(this.selected.Name) : ""
            }
        }                   
    }
</script>

<style scoped>

</style>