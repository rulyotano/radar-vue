import _ from 'lodash'

const _categories = [
    { Name: 'Todos', Id: null, displayName: 'Categorías', displayEvents: 'Todos los eventos', Query: null },
    { Name: 'Música', Id: 1, displayName: 'Música', displayEvents: 'eventos de Música', Query: 'musica' },
    { Name: 'Cine', Id: 2, displayName: 'Cine', displayEvents: 'eventos de Cine', Query: 'cine' },
    { Name: 'Teatro', Id: 3, displayName: 'Teatro', displayEvents: 'eventos de Teatro', Query: 'teatro' },
    { Name: 'Humor', Id: 4, displayName: 'Humor', displayEvents: 'eventos de Humor', Query: 'humor' },
    { Name: 'Danza', Id: 6, displayName: 'Danza', displayEvents: 'eventos de Danza', Query: 'danza' },
    { Name: 'Plástica', Id: 7, displayName: 'Plástica', displayEvents: 'eventos de Plástica', Query: 'plastica' },
    { Name: 'Otros', Id: 5, displayName: 'Otros', displayEvents: 'Otras Categorías', Query: 'otros' }
];

let _categoriesMap = _.keyBy(_categories, 'Id')

const service = {
    categories: _categories,
    categoriesMap: _categoriesMap
};

export default service;