var AgcBreedingDate = (function (exports, core) {
    'use strict';

    var schemaJson = {type:"object",properties:{calvingDate:{title:"Calving Date",id:"calvingDate",type:"string",format:"date",required:true},gestationPeriod:{title:"Gestation Period",id:"gestationPeriod",type:"string","enum":["279","280","281","282","283","284","285","286","287"],required:true}},required:["calvingDate","gestationPeriod"]};

    var uischemaJson = {type:"VerticalLayout",elements:[{type:"Control",scope:"#/properties/calvingDate"},{type:"Control",scope:"#/properties/gestationPeriod"}]};

    const calculate = props => {
      return new Promise((resolve, reject) => {
        let result = {
          package: 'breeding-date',
          properties: { ...props
          },
          values: {} // Breeding date is required

        };

        if (!props['calvingDate']) {
          reject({
            package: 'breeding-date',
            scope: '#/properties/calvingDate',
            message: 'Calving date is required',
            i18n: 'properties.calving-date.required'
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


        let calvingDate = core.parseDate(props['calvingDate']);
        result.values['calvingDate'] = calvingDate;
        let gestationPeriod = parseInt(props['gestationPeriod']);
        result.values['gestationPeriod'] = gestationPeriod; // Calculate values

        result.values['breedingDate'] = core.parseDate(core.addDays(calvingDate, -gestationPeriod));
        result.values['breedingDate_mmddyyyy'] = core.formatDate(result.values['breedingDate'], 'MM/DD/YYYY');
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
