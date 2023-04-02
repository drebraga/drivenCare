import timeCheck from "../functions/checktime.function.js";
import dateCheck from "../functions/checkdate.function.js";

function hourAndDateValidation(req, res, next) {
  const { time, day } = req.body;
  timeCheck(time);
  dateCheck(day);
  next();
}

export default hourAndDateValidation;
