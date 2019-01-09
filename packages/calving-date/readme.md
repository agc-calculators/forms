![ag-calculators.com](https://agc-calculators.github.io/images/calculator-banner.png)

# @agc-calculators/calving-date

Includes a calving date calculator and form schema.

# Installation

Add calving-date to your project:
```
npm i @agc-calculators/calving-date
```

# Calculate Usage
```javascript
import { calculate } from '@agc-calculators/calving-date'

calculate({
    breedingDate: '2019-1-1',
    gestationPeriod: '283'
}).then(result => {
    console.log('calving date', result.values['calvingDate'])
})
```

# Schema Usage
```javascript
import { schema, uischema } from '@agc-calculators/calving-date'
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

