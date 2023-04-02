import errors from "../errors/index.js";
import err from "../errors/index.js";

function userTypeValidate(type) {
  return async (req, res, next) => {
    const user = res.locals.user;
    if (user.userType !== type) throw errors.unauthorizedError();
    next();
  };
}

export default userTypeValidate;
