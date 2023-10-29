const connectToMongo= require("./db")
const express= require('express')
connectToMongo()
const app= express()
const port= 3000
app.use(express.json())
app.use('/api/auth',require("./routes/auth"))
app.get('/',(req,res)=>{
    res.send("Hello, This is Soumya")
})
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})

