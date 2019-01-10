import { addDays, formatDate, parseDate } from '@agc-calculators/core'
import schemaJson from './schema.json'
import uischemaJson from './uischema.json'

export const calculate = (props) => {

    return new Promise((resolve, reject) => {
        let result = { package: 'calving-date', properties: {...props}, values: {} }

        // Breeding date is required
        if (!props['breedingDate']) {
            reject({ 
                package: 'calving-date', 
                scope: '#/properties/breedingDate', 
                message: 'Breeding date is required', 
                i18n: 'properties.breeding-date.required' 
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
        let breedingDate = parseDate(props['breedingDate'])
        result.values['breedingDate'] = breedingDate
        let gestationPeriod = parseInt(props['gestationPeriod'])
        result.values['gestationPeriod'] = gestationPeriod

        // Calculate values
        result.values['calvingDate'] = parseDate(addDays(breedingDate, gestationPeriod))
        result.values['calvingDate_mmddyyyy'] = formatDate(result.values['calvingDate'], 'MM/DD/YYYY')
        result.calculated = new Date()

        resolve(result)
    })
}

export const schema = schemaJson
export const uischema = uischemaJson
