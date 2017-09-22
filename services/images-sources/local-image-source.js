const versions = {
    thumb: 1,
    small: 3,
    medium: 5,
    big: 8
}

const localImageSource = {
    Id: 1,
    Name: "Local",
    Versions: versions,
    GetImageUrl: (imageKey, imageVersion) => `${process.env.apiUrl}/${process.env.imagesPath}/${imageKey}_${versions[imageVersion]}.jpeg`
};

export default localImageSource;