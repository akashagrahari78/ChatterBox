const express = require("express")
const app = express();


app.use(cors())


app.get("/", (req, res)=>{
    res.send("you are in home page")

})

app.listen(3000, ()=>{
    console.log("server running in port 3000")
    
})