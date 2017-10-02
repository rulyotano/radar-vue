import _ from 'lodash'

const _validateParams = (id, desc, regexPattern)=>{
    if (_.isString(id) && id.match(regexPattern))
        return { id, desc }
    if (_.isString(desc) && desc.match(regexPattern))
        return { id: desc, desc: id }
    return { id: null, desc: null }
}

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
    },
    /**Validate the params of a route of type desc/guid or guid/desc, returns the correct id and desc arguments, or null
     * @param id {string} - Guid or desc string
     * @param desc {string} - Desc or Guid string
     * @return {object} - Object in the form {id:, desc:}
     */
    validateParamsGuid(id, desc){
        return _validateParams(id, desc, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    },

    /**Validate the params of a route of type desc/int or int/desc, returns the correct id and desc arguments, or null
     * @param id {string} - Int or desc string
     * @param desc {string} - Desc or Int string
     * @return {object} - Object in the form {id:, desc:}
     */
    validateParamsInt(id, desc){
        return _validateParams(id, desc, /^\d+$/i)
    }    
};

export default service;