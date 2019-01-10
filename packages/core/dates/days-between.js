export const daysBetween = (d1, d2) => {
    var first = new Date(d1);
    var second = new Date(d2);
    return Math.round((first.getTime() - second.getTime())/(24*60*60*1000));
}