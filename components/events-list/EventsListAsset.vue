<template>
    <div class="row s-row" ng-hide="eventsLoading">
        <div class="col-md-3 col-sm-4" ng-repeat="event in events">
            <a class="event-i" ng-href="/event/{{::event.Id+(event.urlDescription ? '/'+event.urlDescription : '')}}" ng-class="{'e-cancel': event.Status == 1}">
                <i class="verify abs fa fa-check" ng-if="event.Verified" title="Verificado"></i>

                <div class="media-i b-cut" ng-class="{'no-img no-img-e' : !event.ui.DisplayImage.Key}"
                        radar-image="event.ui.DisplayImage.Key" image-version="small">
                    <div class="media-hover">
                        <div class="media-hover-i">
                            <p class="text-collapsed active">Conozca más sobre este evento</p>
                            <p class="text-collapsed cancel">Cancelado</p>
                            <div class="more"><i class="fa fa-plus"></i></div>
                        </div>
                    </div>
                </div>

                <div class="event-i-body">
                    <h4 class="event-i-title"><i class="star fa fa-star" ng-if="event.Highlight"></i> {{::event.Name}}</h4>

                    <p class="event-i-aux text-collapsed">
                        <span ng-if="!event.Artists || event.Artists.length === 0">Sin artista</span>
                        <span ng-repeat="artist in event.Artists">
                            {{::artist.Name}}<span ng-if="!$last">, </span>
                        </span>
                    </p>

                    <div class="event-i-f">
                        <div class="event-i-f-ctr">
                            <div uib-dropdown class="pull-left">
                                <span class="btn-ctr" title="Opciones" uib-dropdown-toggle><i class="fa fa-cog"></i></span>
                                <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                                    <li ng-if="userInfo.Admin || userInfo.Id == event.Creator.Id">
                                        <span title="Delete" ng-click="remove($event,event.Id)">Eliminar</span>
                                    </li>
                                    <li ng-if="userInfo.Admin || userInfo.Id == event.Creator.Id">
                                        <span title="Editar" ng-click="edit($event,event.Id)">Editar</span>
                                    </li>
                                    <li>
                                        <span title="Reportar" ng-click="report($event, $index)">Reportar</span>
                                    </li>
                                </ul>
                            </div>
                            <div uib-dropdown class="pull-left">
                                <span class="btn-ctr" title="Compartir evento" uib-dropdown-toggle><i class="fa fa-share-square-o"></i></span>
                                <ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                                    <li>
                                        <span title="Compartir en Facebook" ng-click="shareFacebook($event, $index)">Facebook</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="event-i-f-l text-collapsed">
                            <span title="{{:: event.Place.Name + (event.Cover ? ' | '+ event.Cover + ' ' + event.Currency.IsoCode : '')}}"><i class="fa fa-map-marker"></i> {{::event.Place.Name}}</span> <span ng-if="event.Cover">| <span>{{ event.Cover + " " + event.Currency.IsoCode }}</span></span>
                        </div>

                        <div class="event-i-f-l text-collapsed">{{::event.ui.Date }}</div>
                    </div>
                </div>
            </a>
        </div>
        <div class="col-md-3 col-sm-4" ng-if="eventsAdd">
            <a class="event-i-add" target="_self" ng-href="{{eventsAdd}}" title="Crear evento"><i class="fa fa-plus"></i></a>
        </div>
    </div>
</template>

<script>
    import EventItem from '~/components/events-list/EventItem.vue'
    export default {
        components: { EventItem },
        props: ["events"]        
    }
</script>

<style scoped>

</style>