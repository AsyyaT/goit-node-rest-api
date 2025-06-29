import * as authServices from "../services/authServices.js"
import ctrlWrapper from "../helpers/ctrlWrapper.js"

const registerController = async(req, res) => {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
}

const loginController = async(req, res)=> {
    const token = await authServices.loginUser(req.body);
    const {email} = req.body;
    const user = await authServices.findUserByEmail(email)

    res.json({token, user: {
            email: user.email,
            subscription: user.subscription,
        },});
}

const getCurrentController = async(req, res) => {
    const {email, subscription} = req.user;
    res.json({email, subscription})
}

const logoutController = async(req, res) => {
    await authServices.logoutUser(req.user)

    res.status(204).send()
}

export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    getCurrentController: ctrlWrapper(getCurrentController),
    logoutController: ctrlWrapper(logoutController),
}