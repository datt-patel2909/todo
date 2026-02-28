const express = require('express')
const app = express()
const todo = require('./Routes/to-do.js')
const connectDB = require('./db/connect.js')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/todo', todo)

app.use((req, res) => {
   res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});


const port = process.env.PORT || 3000
const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, console.log(`Server Listenng on port ${port}...`)
      )
   } catch (error) {
      console.log(error)
   }
}
start()


