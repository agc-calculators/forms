var AgcCore = (function (exports) {
    'use strict';

    const addDays = (dt, days) => {
      if (typeof dt === 'string') {
        dt = new Date(dt);
      }

      var newDate = new Date(dt);
      var nextDate = dt.getDate() + parseInt(days);
      newDate.setDate(nextDate);
      return newDate;
    };

    const daysBetween = (d1, d2) => {
      var first = new Date(d1);
      var second = new Date(d2);
      return Math.round((first.getTime() - second.getTime()) / (24 * 60 * 60 * 1000));
    };

    const formatDate = (dt, mask) => {
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
    };

    const parseDate = dt => {
      if (typeof dt === 'string') {
        dt = new Date(dt);
      }

      return dt;
    };

    const validateElement = (form, name) => {
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
    };

    const FormValidator = (form, options) => {
      const opts = Object.assign({}, {
        invalidClass: 'invalid'
      }, options);
      return name => {
        let el = form.querySelector(`[name="${name}"]`);
        let message = form.querySelector(`[data-validates="${name}"`);

        if (!el.checkValidity()) {
          if (el.className.indexOf(opts.invalidClass) === -1) {
            el.className += ` ${opts.invalidClass}`;
          }

          message.style.display = 'block';
          return false;
        } else {
          el.className = el.className.replace(` ${opts.invalidClass}`, "");
          message.style.display = 'none';
        }

        return true;
      };
    };

    exports.addDays = addDays;
    exports.formatDate = formatDate;
    exports.parseDate = parseDate;
    exports.daysBetween = daysBetween;
    exports.FormValidator = FormValidator;
    exports.validateElement = validateElement;

    return exports;

}({}));
