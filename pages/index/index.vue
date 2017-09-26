<template>
  <div>
      <EventListWrapper/>

      <!-- <nuxt-link to="/event/buena-fe-en-concierto/e023f23">Event</nuxt-link>      
      <nuxt-link to="/place/barbaram/e023f23">Place</nuxt-link>      
      <nuxt-link to="/artist/x-alfonso/e023f23">Artist</nuxt-link>      

      <img :src="testImageUrl" style="width: 300px; height: 300px"/> -->
  </div>
</template>

<script>

import imagesService from '~/services/images-service'
import EventListWrapper from '~/components/events-list/EventListWrapper.vue'
import DivImage from '~/components/common/image/DivImage.vue'

export default {
  components:{
    EventListWrapper,
    DivImage
  },
  data(){
    return {
    }
  },
  fetch({store, params}){
    return store.dispatch('loadEvents');    
  }
}
</script>

<style>
</style>
