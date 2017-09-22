<template>
  <div>
    <SiteHeader/>

    <div id="wrap" class="ctn">
        <div class="row s-row">
            <div class="col-sm-9">
              <nuxt-child/>
            </div>

            <div class="col-sm-3 sidebar">
              <SideBar/>
            </div>
        </div>
    </div>
    
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
