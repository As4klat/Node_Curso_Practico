const http2 = require('http2')
const fs = require('fs')

const {
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS
} = http2.constants

const server = http2.createSecureServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
})

server.on('error',(err)=>{
    console.error('Ocurrio un error',err)
})

server.on('stream',(stream,headers)=>{
    const responseBody = [
        {prop1: 1, prop2: 'hola 1'},
        {prop1: 2, prop2: 'hola 2'},
        {prop1: 3, prop2: 'hola 3'}
    ]

    stream.respond({
        'content-type': 'application/json',
        ':status': 200
    })
    const resp = JSON.stringify(responseBody)
    stream.end(resp)
})

const port = 8443
server.listen(port,()=>{
    console.log(`El servidor SEGURO esta escuchando en el puerto ${port}`)
})