var AgcCalvingDate = (function (exports, core) {
    'use strict';

    var schemaJson = {type:"object",properties:{breedingDate:{title:"Breeding Date",id:"breedingDate",type:"string",format:"date",required:true},gestationPeriod:{title:"Gestation Period",id:"gestationPeriod",type:"string","enum":["279","280","281","282","283","284","285","286","287"],required:true}},required:["breedingDate","gestationPeriod"]};

    var uischemaJson = {type:"VerticalLayout",elements:[{type:"Control",scope:"#/properties/breedingDate"},{type:"Control",scope:"#/properties/gestationPeriod"}]};

    const calculate = props => {
      return new Promise((resolve, reject) => {
        let result = {
          package: 'calving-date',
          properties: { ...props
          },
          values: {} // Breeding date is required

        };

        if (!props['breedingDate']) {
          reject({
            package: 'calving-date',
            scope: '#/properties/breedingDate',
            message: 'Breeding date is required',
            i18n: 'properties.breeding-date.required'
          });
          return;
        } // Gestation period is required


        if (!props['gestationPeriod']) {
          reject({
            package: 'calving-date',
            scope: '#/properties/gestationPeriod',
            message: 'Gestation period is required',
            i18n: 'properties.gestation-period.required'
          });
          return;
        } // Format input values


        let breedingDate = core.parseDate(props['breedingDate']);
        result.values['breedingDate'] = breedingDate;
        let gestationPeriod = parseInt(props['gestationPeriod']);
        result.values['gestationPeriod'] = gestationPeriod; // Calculate values

        result.values['calvingDate'] = core.parseDate(core.addDays(breedingDate, gestationPeriod));
        result.values['calvingDate_mmddyyyy'] = core.formatDate(result.values['calvingDate'], 'MM/DD/YYYY');
        result.calculated = new Date();
        resolve(result);
      });
    };
    const schema = schemaJson;
    const uischema = uischemaJson;

    exports.calculate = calculate;
    exports.schema = schema;
    exports.uischema = uischema;

    return exports;

}({}, AgcCore));
