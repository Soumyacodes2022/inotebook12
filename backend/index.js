const connectToMongo= require("./db")
const express= require('express')
connectToMongo()
const app= express()
const port= 5500
app.use(express.json())
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))

app.get('/',(req,res)=>{
    res.send("Hello, This is Soumya")
})
app.listen(port,()=>{
    console.log(`iNotebook Backend started at http://localhost:${port}`)
})

