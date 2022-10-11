const express = require('express')
const cors = require('cors')
const router = require('./routers/')

const conn = require('./db/conn')

require('dotenv').config();
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 3000;

conn.sync().then(() => {
    app.listen(port, console.log(`http://localhost:${port}`))
}).catch((err) => console.log(err));


