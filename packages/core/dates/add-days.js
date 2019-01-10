export const addDays = (dt, days) => {
    if (typeof dt === 'string') {
        dt = new Date(dt)
    }
    var newDate = new Date(dt)
    var nextDate = dt.getDate() + parseInt(days)
    newDate.setDate(nextDate)
    return newDate
}