const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const app = express()
const port = 3000

const streamlog = rfs.createStream('log.txt', {
    size: '10M',
    interval: '1d',
    compress: 'gzip',
    path: path.join(__dirname, 'log')
})

app.use(morgan('combined', { stream: streamlog }))

app.use(cors({
    origin: `http://localhost:${port}`
}))

app.use(helmet())
const routerClientes = require('./router/clienteRoute')
app.use('/api/clientes/',routerClientes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))