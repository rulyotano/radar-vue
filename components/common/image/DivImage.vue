<template >
    <div :style="imgStyle">
        <slot></slot>
    </div>
</template>

<script>
    import imageMixin from '~/components/common/image/image-mixin'
    export default {
        mixins:[
            imageMixin
        ],
        computed:{
            imgStyle(){
                let style = {}
                if (this.imageUrl)
                    style['background-image'] =  'url('+this.imageUrl+')'
                return style
            }
        }
    }
</script>

<style scoped>

</style>