

export const FormValidator = (form, options) => {
    
    const opts = Object.assign({}, { invalidClass: 'invalid'}, options)

    return (name) => {
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
        return true
    }   
}