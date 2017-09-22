import localImageSource from '~/services/images-sources/local-image-source';

const sources = [localImageSource];
const defaultSource = localImageSource;

const service = {
    sources: sources,
    defaultSource: defaultSource,
    availableVersions: ['thumb', 'small', 'medium', 'big'],
    imageUrl: (key, version, source) => {
        let selectedSource = defaultSource;
        if (source)
            selectedSource = sources.find(item => item.Id === source);
        if (!selectedSource)
            selectedSource = defaultSource;
        if (!version)
            version = Object.keys(selectedSource.Versions).last();
        return selectedSource.GetImageUrl(key, version);
    },
    uploadImage: function($flow) {
        //TODO
        // if (!$flow || !$flow.files.length) {
        //     var deferred = $q.defer();
        //     deferred.resolve("");
        //     return deferred.promise;
        // } else {
        //     return helpers.postImageWithFlow($flow, "/Image/UploadImage", {});
        // }
    },
    removeImage: function(tempImageName) {
        //TODO
        // return helpers.http({
        //     method: 'POST',
        //     url: "/Image/RemoveImage",
        //     data: {
        //         tempImageName: tempImageName
        //     }
        // });
    },
    imagePreview: function (file) {
        //TODO
        // var deferred = $q.defer();
        //
        // var reader = new FileReader();
        //
        // reader.onload = function (e) {
        //     return deferred.resolve(e.target.result);
        // };
        //
        // reader.readAsDataURL(file);
        //
        // return deferred.promise;
    },
    list : function(model) {
        //TODO
        // return helpers.http({
        //     method: 'GET',
        //     url: "/image/list/",
        //     params: model
        // });
    },
    select: function () {
        //TODO
        // var modalInstance = $uibModal.open({
        //     size: 'lg',
        //     templateUrl: "selectImageModal.html",
        //     controller: "ImageController"
        // });
        //
        // return modalInstance;
    }
};


export default service;