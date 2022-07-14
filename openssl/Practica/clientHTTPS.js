const http2 = require('http2')
const fs = require('fs')

const {
    HTTP2_HEADER_METHOD,
    HTTP2_METHOD_GET,
    HTTP2_HEADER_PATH
} = http2.constants

const url = 'https://localhost:8443/'
const client = http2.connect(url,{
    ca: fs.readFileSync('./certs/cert.pem'),
    rejectUnauthorized: false
},(session,listener)=>{
    console.log(`Se ha establecido la sesion en ${url}`)
})

client.on('error',(err)=> console.error(err))

const req = client.request({
    [HTTP2_HEADER_METHOD]: [HTTP2_METHOD_GET],
    [HTTP2_HEADER_PATH]: '/'
})

req.on('response',(cabecerasRecibida,flags)=>{
    console.dir(cabecerasRecibida)
})

req.setEncoding('utf8')
let data = ''
req.on('data', (chunk)=>{
    data += chunk
})

req.on('end',()=>{
    console.log(`Datos recibidos: ${data}`)
    client.close()
})