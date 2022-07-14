const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')

const port = 5002
const app = express()

//Crea el logger
const streamlog = rfs.createStream('log.txt',{
    size: '10M',
    interval: '1d',
    compress: 'gzip',
    path: path.join(__dirname, 'log')
})

app.use(morgan('combined',{stream:streamlog}))
app.use(cors({
    origin: `http://localhost:${port}`
}))

app.use(helmet())

const consultasRouter = require('./routes/consultas')
app.use('/api/consultas',consultasRouter)

app.listen(port, ()=> console.log(`El sitio APIs REST con Express se inició satisfactoriamente en el puerto ${port}`))