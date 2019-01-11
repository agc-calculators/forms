import { addDays, formatDate, parseDate } from '@agc-calculators/core'
import schemaJson from './schema.json'
import uischemaJson from './uischema.json'

export const calculate = (props) => {

    return new Promise((resolve, reject) => {
        let result = { package: 'breeding-date', properties: {...props}, values: {} }

        // Breeding date is required
        if (!props['calvingDate']) {
            reject({ 
                package: 'breeding-date', 
                scope: '#/properties/calvingDate', 
                message: 'Calving date is required', 
                i18n: 'properties.calving-date.required' 
            })
            return
        }

        // Gestation period is required
        if (!props['gestationPeriod']) {
            reject({ 
                package: 'calving-date', 
                scope: '#/properties/gestationPeriod', 
                message: 'Gestation period is required', 
                i18n: 'properties.gestation-period.required' 
            })
            return            
        }

        // Format input values
        let calvingDate = parseDate(props['calvingDate'])
        result.values['calvingDate'] = calvingDate
        let gestationPeriod = parseInt(props['gestationPeriod'])
        result.values['gestationPeriod'] = gestationPeriod

        // Calculate values
        result.values['breedingDate'] = parseDate(addDays(calvingDate, -gestationPeriod))
        result.values['breedingDate_mmddyyyy'] = formatDate(result.values['breedingDate'], 'MM/DD/YYYY')
        result.calculated = new Date()

        resolve(result)
    })
}

export const schema = schemaJson
export const uischema = uischemaJson
