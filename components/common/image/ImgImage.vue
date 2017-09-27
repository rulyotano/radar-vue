<template >
    <img :src="imageUrl"/>
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