import check from "../functions/checktime.function.js";

function hourValidation(req, res, next) {
  const { checkin, checkout } = req.body;
  check(checkin);
  check(checkout);
  next();
}

export default hourValidation;
