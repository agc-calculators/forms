var CalvingDate = (function (exports) {
    'use strict';

    var dates$1 = dates = {
      addDays: function (dt, days) {
        if (typeof dt === 'string') {
          dt = new Date(dt);
        }

        var newDate = new Date(dt);
        var nextDate = dt.getDate() + parseInt(days);
        newDate.setDate(nextDate);
        return newDate;
      },
      daysBetween: function (d1, d2) {
        var first = new Date(d1);
        var second = new Date(d2);
        return Math.round((first.getTime() - second.getTime()) / (24 * 60 * 60 * 1000));
      },
      format: function (dt, mask) {
        var newDate = new Date(dt);
        var dd = newDate.getDate();
        var mm = newDate.getMonth() + 1;
        var y = newDate.getFullYear();
        var month = ('0' + mm).slice(-2);
        var day = ('0' + dd).slice(-2);
        var map = {
          'YYYY': y,
          'yyyy': y,
          'MM': month,
          'mm': month,
          'DD': day,
          'dd': day
        };
        var sep = "";

        if (mask.indexOf('/') !== -1) {
          sep = "/";
        } else if (mask.indexOf('-') !== -1) {
          sep = "-";
        } else {
          throw new Error('Invalid date mask!');
        }

        var split = mask.split(sep);
        var ret = split.reduce(function (prev, current) {
          prev = prev + (map[current] || current) + sep;
          return prev;
        }, "");
        return ret.slice(0, ret.length - 1);
      },
      parse: function (dt) {
        if (typeof dt === 'string') {
          dt = new Date(dt);
        }

        return dt;
      }
    };

    validation = {
      validate: function (form, name) {
        let el = form.querySelector(`[name="${name}"]`);
        let message = form.querySelector(`[data-validates="${name}"`);

        if (!el.checkValidity()) {
          if (el.className.indexOf('invalid') === -1) {
            el.className += " invalid";
          }

          message.style.display = 'block';
          return false;
        } else {
          el.className = el.className.replace(" invalid", "");
          message.style.display = 'none';
        }

        return true;
      }
    };

    var schemaJson = {type:"object",properties:{breedingDate:{type:"string",format:"date"},gestationPeriod:{type:"string","enum":["279","280","281","282","283","284","285","286","287"]}},required:["breedingDate","gestationPeriod"]};

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


        let breedingDate = dates$1.parse(props['breedingDate']);
        result.values['breedingDate'] = breedingDate;
        let gestationPeriod = parseInt(props['gestationPeriod']);
        result.values['gestationPeriod'] = gestationPeriod; // Calculate values

        result.values['calvingDate'] = dates$1.parse(dates$1.addDays(breedingDate, gestationPeriod));
        result.values['calvingDate_mmddyyyy'] = dates$1.format(result.values['calvingDate'], 'MM/DD/YYYY');
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

}({}));
