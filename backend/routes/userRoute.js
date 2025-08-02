const express = require("express")
const {userLogin, userRegister, getUserById} = require("../controllers/userController.js")


const {authUser} = require("../middlewares/authUser.js")

const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)
userRouter.get("/:id", authUser, getUserById);

module.exports = userRouter

