const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')

const port = 5001

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

app.get('/api/consulta1', (req,res)=>{
    console.log('headers.host:', req.headers.host)
    console.log('originalUrl:', req.originalUrl)
    
    res.json([
        {
            nombre: 'Cliente1',
            apellido: 'Apellido1',
            edad: 54
        },
        {
            nombre: 'Cliente2',
            apellido: 'Apellido2',
            edad: 33
        },
        {
            nombre: 'Cliente3',
            apellido: 'Apellido3',
            edad: 74
        }
    ])
})

app.listen(port, ()=> console.log(`El sitio APIs REST con Express se inició satisfactoriamente en el puerto ${port}`))