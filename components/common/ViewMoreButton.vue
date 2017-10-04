<template>
    <button class="btn-m btn-primary btn-block add-button" @click="onClick($event)">Ver Más</button> 
</template>

<script>
    export default {
        methods:{
            onClick(e){
                this.$emit('click', e)
            }
        }        
    }
</script>

<style scoped>
.add-button{
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 20px;
}
</style>