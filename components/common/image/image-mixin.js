import imagesService from '~/services/images-service.js'
const ImageMixin = {
    props: [
        "imageKey",
        "imageVersion",
        "imageSource"
    ],
    computed:{
        imageUrl: function(){
            if (!this.imageKey)
                return ""
            return imagesService.imageUrl(this.imageKey, this.imageVersion, this.imageSource);             
        }        
    }
}

export default ImageMixin;