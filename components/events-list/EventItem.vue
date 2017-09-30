<template>
    <div class="col-md-3 col-sm-4">
        <nuxt-link class="event-i" :class="{'e-cancel': event.Status == 1}"
                :to="'/event/'+ urlDescription + '/'+event.Id">
            <i class="verify abs fa fa-check" title="Verificado" v-if="event.Verified"/>

            <DivImage class="media-i b-cut" :class="{'no-img no-img-e':!displayImage}"
                    :imageKey="displayImage"
                    imageVersion="small">
                <div class="media-hover">
                    <div class="media-hover-i">
                        <p class="text-collapsed active">Conozca más sobre este evento</p>
                        <p class="text-collapsed cancel">Cancelado</p>
                        <div class="more"><i class="fa fa-plus"/></div>
                    </div>
                </div>
            </DivImage>

            <div class="event-i-body">
                <h4 class="event-i-title"><i v-if="event.Highlight" class="star fa fa-star"/> {{event.Name}}</h4>

                <p class="event-i-aux text-collapsed">
                    <span v-if="!event.Artists || event.Artists.length === 0">Sin artista</span>
                    <span v-for="(artist, i) in event.Artists" :key="artist.Id">
                        {{artist.Name}}
                        <span v-if="i != event.Artists.length - 1">,</span>
                    </span>
                </p>

                <div class="event-i-f">
                    <div class="event-i-f-ctr">
                        <div class="pull-left dropdown"  :class="{'open': shareDropdownOpen}">
                            <span class="btn-ctr dropdown-toggle" title="Compartir evento" @click.stop.prevent="shareDropdownOpen=!shareDropdownOpen"><i class="fa fa-share-square-o"/></span>
                            <ul class="dropdown-menu">
                                <li  @click.stop.prevent><span title="Compartir en Facebook">Facebook</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="event-i-f-l text-collapsed">
                        <span :title="event.Place.Name + coverStr">
                            <i class="fa fa-map-marker"/>
                                {{event.Place.Name}}
                        </span>
                        {{coverStr}}
                    </div>

                    <div class="event-i-f-l text-collapsed">{{date}}</div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    import radarEventsService from '~/services/radar-events-service'
    import dateService from '~/services/date-service'
    import DivImage from '~/components/common/image/DivImage.vue'
    import _ from 'lodash'

    export default {
        components: {DivImage},
        props: ['event', 'imagePriority'],
        data(){
            return {
                shareDropdownOpen: false
            };
        },
        computed: {
            date(){ return dateService.fromServerDate(this.event.DateTime).format(dateService.formats.EVENT_DISPLAY_DATE_TIME) },
            displayImage() { return _.get(radarEventsService.getImage(this.event, this.imagePriority), 'Key') },
            urlDescription() { return radarEventsService.urlDescription(this.event) },
            coverStr() { return this.event.Cover ? ` | ${this.event.Cover} ${this.event.Currency.IsoCode}` : '' }
        }        
    }
</script>

<style scoped>

</style>