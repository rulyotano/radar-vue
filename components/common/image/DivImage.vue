<template >
    <div v-if="imageKey" :style="{'background-image': 'url('+imageUrl+')'}">
        <slot></slot>
    </div>
    <div v-else><slot></slot></div>
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