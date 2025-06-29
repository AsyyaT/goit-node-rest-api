import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js"
import User from "../db/User.js"
import { createToken } from "../helpers/jwt.js";


export const getUser = async (userId) => {
  return User.findByPk(userId);
};

export const findUserByEmail = async (email) => {
  return User.findOne({where: {email}});
};


export const registerUser = async payload => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({...payload, password: hashPassword});
}

export const loginUser = async({email, password}) => {
    const user = await findUserByEmail(email)

    if (!user) throw HttpError(401, "Email or passwors invalid")
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or passwors invalid")

    const payload = {id: user.id,}

    const token = createToken(payload);
    user.token = token;
    await user.save();

    return token;
}


export const logoutUser = async ({email}) => {
    const user = await findUserByEmail(email)
    if(!user) throw HttpError(401, "Not authorized");
    user.token = "";
    await user.save();
}
