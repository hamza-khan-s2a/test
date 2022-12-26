
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();
userRouter.get('/createadmin', expressAsyncHandler(async (req, res) => {
  try {
    const user = new User({
      name: 'admin',
      email: 'admin@example.com',
      password: 'jsamazona',
      isAdmin: true
    });
    const userCreated = await user.save();
    res.send(userCreated);
    // res.send("created");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  if (!signinUser) {
    res.status(401).send({
      message: "InCorrect Emain or Password"
    })
  } else {
    res.send({

      id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: generateToken(signinUser)
    })
  }
}))

userRouter.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  console.log(user);
  const createUser = await user.save()
  console.log(createUser);

  if (!createUser) {
    console.log("error");
    res.status(401).send({
      message: "InValid User Data"
    })
  } else {
    console.log("no error");
    res.send({

      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      token: generateToken(createUser)
    })
  }
})
userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404).send({
      message: "User Not Found"
    })
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = user.save();

    res.send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser)
    })
  }
}))
export default userRouter;