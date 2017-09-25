<template >
    <img v-if="imageKey" :src="imageUrl"/>
    <img v-else/>
</template>

<script>
    import imageMixin from '~/components/common/image/image-mixin'
    export default {
        mixins:[
            imageMixin
        ]
    }
</script>

<style scoped>

</style>