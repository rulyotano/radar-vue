<template>
  <div>
    <SiteHeader/>
    <SideBar/>
    <nuxt/>
    <SiteFooter/>
  </div>
</template>

<script>
import SiteHeader from '~/components/header/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import SideBar from '~/components/sidebar/SideBar.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
    SideBar
  }
}
</script>


<style>
  
</style>
