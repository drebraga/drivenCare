import userServices from "../services/users.services.js";

async function signUp(req, res, next) {
    const { name, email, password } = req.body;
    try {
        await userServices.signup({ name, email, password });

        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        const token = await userServices.signin({ email, password });

        return res.send({ token });
    } catch (err) {
        console.log(err)
        next(err);
    }
}

export default {
    signUp, signIn
};