const express = require("express")
const {userLogin, userRegister} = require("../controllers/userController.js")


const {authUser} = require("../middlewares/authUser.js")

const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)

module.exports = userRouter

