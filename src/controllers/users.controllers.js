import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
dayjs.extend(isBetween)

async function signUp(req, res, next) {
    try {
        const body = req.body;

        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signIn(req, res, next) {
    try {
        const body = req.body;

        return res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export default {
    signUp, signIn
};