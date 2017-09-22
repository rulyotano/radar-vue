<template>
  <section class="container">
    <div>
      Radar Event Lists

      <nuxt-link to="/event/buena-fe-en-concierto/e023f23">Event</nuxt-link>      
      <nuxt-link to="/place/barbaram/e023f23">Place</nuxt-link>      
      <nuxt-link to="/artist/x-alfonso/e023f23">Artist</nuxt-link>      

      <img :src="testImageUrl" style="width: 300px; height: 300px"/>
    </div>
  </section>
</template>

<script>

import imagesService from '~/services/images-services';

export default {
  data(){
    return {
      testImageUrl: imagesService.imageUrl('w1gtk14e.gpk', "medium")
    }
  }
}
</script>

<style>
</style>
