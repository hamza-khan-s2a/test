import jwt from "jsonwebtoken";
import config from "./config.js";


export const generateToken = (signinUser) => jwt.sign({
  id: signinUser.id,
  name: signinUser.name,
  email: signinUser.email,
  isAdmin: signinUser.isAdmin,
}, config.JWT_SECRET)

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: "Token is  not Supplied" })
  } else {
    const token = bearerToken.slice(7, bearerToken.length)
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" })
      } else {
        req.user = data
        next()
      }
    })
  }
}