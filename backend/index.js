const express = require("express")
const cors = require("cors")
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));





app.get("/", (req, res)=>{
    res.send("you are in home page")

})

app.listen(3000, ()=>{
    console.log(`server running in port ${PORT}`)
    
})