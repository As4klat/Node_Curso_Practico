const http2 = require('http2')

const {
    HTTP2_HEADER_METHOD,
    HTTP2_METHOD_GET,
    HTTP2_HEADER_PATH
} = http2.constants

const url = 'http://localhost:15500/'
const client = http2.connect(url,(session,listener)=>{
    console.log(`Se ha establecido la sesion en ${url}`)
})

const req = client.request({
    [HTTP2_HEADER_METHOD]: [HTTP2_METHOD_GET],
    [HTTP2_HEADER_PATH]: '/'
})

req.on('response',(cabecerasRecibida)=>{
    console.dir(cabecerasRecibida)

    req.on('data', (bytesRecibidos)=>{
        const mensaje = bytesRecibidos.toString()
        console.log(`Datos recibidos: ${mensaje}`)
    })

    req.on('end',()=>{client.destroy()})
})