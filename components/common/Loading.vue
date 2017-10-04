<template>
    <div class="snipper-container">        
        <MoonLoader :loading="loading" :color="'#e61414'" size="50px"/>
    </div>
</template>

<script>
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

    export default {
        components:{MoonLoader},
        props:['loading']        
    }
</script>

<style scoped>
.snipper-container{
    margin-right: auto;
    margin-left: auto;
    display: block;
    width: 100px;
}
</style>