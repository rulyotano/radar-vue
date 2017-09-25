/**
 * Created by Raul on 6/1/2017.
 */

import moment from 'moment';
import dateService from '~/services/date-service.js';

const shortWeekDateFormat = dateService.formats.SHORT_WEEKDAY_DATE;

const dOptions = [{
        name: 'Todos',
        selectText: 'Fecha'
    }, {
        name: 'Hoy',
        selectText: 'Hoy',
        end: moment().endOf("day")
    }, {
        name: 'Mañana',
        selectText: 'Mañana',
        begin: moment().add(1, 'd').startOf("day"),
        end: moment().add(1, 'd').endOf("day")
    }, {
        name: moment().add(2, 'd').format(shortWeekDateFormat),
        selectText: moment().add(2, 'd').format(shortWeekDateFormat),
        begin: moment().add(2, 'd').startOf("day"),
        end: moment().add(2, 'd').endOf("day")
    }, {
        name: moment().add(3, 'd').format(shortWeekDateFormat),
        selectText: moment().add(3, 'd').format(shortWeekDateFormat),
        begin: moment().add(3, 'd').startOf("day"),
        end: moment().add(3, 'd').endOf("day")
    }, {
        name: moment().add(4, 'd').format(shortWeekDateFormat),
        selectText: moment().add(4, 'd').format(shortWeekDateFormat),
        begin: moment().add(4, 'd').startOf("day"),
        end: moment().add(4, 'd').endOf("day")
    }, {
        name: 'Este Fin',
        selectText: 'Este Fin',
        begin: moment().day(6).startOf("day"),
        end: moment().day(7).endOf("day")
    }, {
        name: 'Esta Semana',
        selectText: 'Esta Semana',
        end: moment().day(7).endOf("day")
    }
];

for (let key = 1; key < dOptions.length; key++) {
    dOptions[key].key = key;
}


const service = {
    dateOptions: dOptions,

    coverOptions: [
        {
            name: 'No definido',
            selectText: 'Cover'
        }, {
            name: 'Menos de 2 CUC',
            min: null,
            max: 2,
            selectText: '< 2 CUC'
        }, {
            name: 'De 2 a 5 CUC',
            min: 2,
            max: 5,
            selectText: '2 - 5 CUC'
        }, {
            name: 'De 5 a 15 CUC',
            min: 5,
            max: 15,
            selectText: '5 - 15 CUC'
        }, {
            name: 'Mas de 15 CUC',
            min: 15,
            max: null,
            selectText: '> 15 CUC'
        }
    ],

    timeOptions: [
        {
            name: 'Todo el Dia',
            selectText: 'Hora'
        }, {
            name: 'Manana (8AM a 12PM)',
            selectText: 'Manana',
            begin: 8,
            end: 12
        }, {
            name: 'Tarde (12PM a 7PM)',
            selectText: 'Tarde',
            begin: 12,
            end: 19
        }, {
            name: 'Noche (7PM - 3AM)',
            selectText: 'Noche',
            begin: 19,
            end: 3
        }
    ],

    getDateOption(index) {
        if (index == null || index > service.dateOptions.length - 1)
            return service.dateOptions[0];
        return service.dateOptions[index];
    },

    getTimeOption(time) {
        if (time == null)
            return service.timeOptions[0];
        let result = service.timeOptions.filter(t => t.begin == time.begin && t.end == time.end).head();
        return result != null ? result : service.timeOptions[0];
    },

    getCoverOption(cover) {
        if (cover == null)
            return service.coverOptions[0];
        let result = service.coverOptions.filter(t => t.max == cover.max && t.min == cover.min).head();
        return result != null ? result : service.coverOptions[0];
    }
}

export default service;