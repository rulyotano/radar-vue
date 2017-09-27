import _ from 'lodash'

const service = {
    urlDescription: str => _.kebabCase(_.deburr(_.truncate(str, { omission: '', length: 40 }))),
    /**Join an string array into a unique string
     * @param strItems {Array} - String array
     * @param splitStr {String} - String that will be the separator
     * @return {String}
     */
    joinStr: (strItems, splitStr = ", ") => {
        let result = ""
        if (!_.isEmpty(strItems)){
            for (let i = 0; i < strItems.length-1; i++){
                result+=`${strItems[i]}${splitStr}`
            }
            result+=strItems[strItems.length-1]
        }            
        return result
    }    
};

export default service;