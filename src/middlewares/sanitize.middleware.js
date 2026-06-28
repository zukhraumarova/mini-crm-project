const xss = require('xss');

function sanitize(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }

        const value = obj[key];

        if (typeof value === 'string') {
            obj[key] = xss(value.trim());
        } else if (typeof value === 'object') {
            sanitize(value);
        }
    }

    return obj;
}

module.exports = (req, res, next) => {
    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);

    next();
};