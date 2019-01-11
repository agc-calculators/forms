![ag-calculators.com](https://agc-calculators.github.io/images/calculator-banner.png)

# @agc-calculators/breeding-date

Includes a breeding date calculator and form schema.

# Installation

Add breeding-date to your project:
```
npm i @agc-calculators/breeding-date
```

# Calculate Usage
```javascript
import { calculate } from '@agc-calculators/breeding-date'

calculate({
    calvingDate: '2019-1-1',
    gestationPeriod: '283'
}).then(result => {
    console.log('breeding date', result.values['breedingDate'])
})
```

# Schema Usage
```javascript
import { schema, uischema } from '@agc-calculators/breeding-date'
```

Use with any web component that accepts a schema, i.e. [JsonForms](https://jsonforms.io/)
```html
<JsonForms schema={schema} uischema={uischema} />
```

# Language Support
- Chinese (Simplified)
- English
- French
- German
- Spanish

