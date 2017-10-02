<template>
    <transition name="fade">
        <button v-if="possition > 0" 
                class="circle-md-button up-button"
                @click="goTop()"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
    </transition>
</template>

<script>
    import _ from 'lodash'
    let onWindowsScrollD = ()=>{}
    export default {
        data(){
            return {
                possition: 0
            }
        },
        methods:{
            onWindowScroll(e){
                this.possition = window.pageYOffset || document.documentElement.scrollTop
            },
            goTop(){
                window.scrollTo(0, 0);
            }
        },
        mounted(){
            if (!this.$isServer){
                onWindowsScrollD = _.debounce(this.onWindowScroll, 300)
                window.addEventListener("scroll", onWindowsScrollD)
            }
        },
        beforeDestroy(){
            if (!this.$isServer){
                window.removeEventListener("scroll", onWindowsScrollD, false)
            }
        }        
    }
</script>

<style scoped>
.up-button{
    z-index: 4;
    position: fixed;
    right: 50px;
    bottom: 50px; 
    border: 0;
    background-color: #e61414;
    color: white; 
    opacity: 0.5;
    
    -webkit-transition: opacity 0.5s; /* Safari */
    transition: opacity 0.5s;
}

.up-button:hover{
    opacity: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>