export const formatDate = (dt, mask) => {
    var newDate = new Date(dt)

    var dd = newDate.getDate()
    var mm = newDate.getMonth() + 1
    var y = newDate.getFullYear()

   var month = ('0' + mm).slice(-2)
   var day = ('0' + dd).slice(-2)
    var map = {
        'YYYY': y,
        'yyyy': y,
        'MM': month,
        'mm': month,
        'DD': day,
        'dd': day,
    }
    var sep = "";

    if (mask.indexOf('/') !== -1) {
        sep = "/" 
    } else if (mask.indexOf('-') !== -1) {
        sep = "-"
    } else {
        throw new Error('Invalid date mask!');
    }

    var split = mask.split(sep);
    var ret = split.reduce(function (prev, current) {
        prev = prev + (map[current] || current) + sep
        return prev;
    }, "");

    return ret.slice(0, ret.length - 1)

}