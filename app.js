const express=require('express')
const app= express()
const todo=require('./Routes/to-do.js')
const connectDB=require('./db/connect.js')
require('dotenv').config()


app.use(express.json())
app.use('/api/v1/todo',todo)



const port=process.env.PORT || 6000
const start=async()=>{
   try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port,console.log(`Server Listenng on port ${port}...`)
)
   } catch (error) {
      console.log(error)
   }
}
start()


