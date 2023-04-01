import errors from "../errors/index.js";

function checkHour(req, res, next) {
    const { checkin, checkout } = req.body;
    check(checkin);
    check(checkout);
    next();
}

function check(time) {
    const isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
    if (!isValid) {
        throw errors.unprocessableEntityError("Invalid time on checkin or checkout");
    }
}

export default checkHour;