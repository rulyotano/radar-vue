import configService from '~/services/config-service'

const versions = {
    thumb: 1,
    small: 3,
    medium: 5,
    big: 8
}

let apiUrl = configService.apiUrl()
let imagesPath = configService.imagesPath()

const localImageSource = {
    Id: 1,
    Name: "Local",
    Versions: versions,
    GetImageUrl: (imageKey, imageVersion) => `${apiUrl}/${imagesPath}/${imageKey}_${versions[imageVersion]}.jpeg`
};

export default localImageSource;