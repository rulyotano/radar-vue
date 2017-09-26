import _ from 'lodash'

const service = {
    urlDescription: str => _.kebabCase(_.deburr(_.truncate(str, { omission: '', length: 40 }))),    
};

export default service;