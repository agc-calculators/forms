export const parseDate= (dt) => {
    if (typeof dt === 'string') {
        dt = new Date(dt)
    }
    return dt;
}