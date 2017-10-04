const service = {
    apiUrl: ()=> process.env.apiUrl,
    adminUrl: ()=> process.env.adminUrl,
    imagesPath: ()=> process.env.imagesPath,
    locationUtc: ()=> process.env.locationUtc,
}
export default service