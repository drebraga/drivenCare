import errors from "../errors/index.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

function dateCheck(date) {
  const isValid =
    dayjs(date, "DD/MM/YYYY").isValid() &&
    dayjs(date, "DD/MM/YYYY").isAfter(dayjs(), "day");

  if (!isValid) {
    throw errors.unprocessableEntityError("Invalid date for appointment");
  }
}

export default dateCheck;
