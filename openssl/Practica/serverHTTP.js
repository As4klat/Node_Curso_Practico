const http2 = require('http2')

const {
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS
} = http2.constants

const server = http2.createServer((request,response)=>{
    console.log('Se conecto un cliente')
    request.on('end',()=>{
        console.log('El cliente se desconecto')
    })
    request.on('error',(err)=>{
        console.log('Ocurrio un error al procesar la solicitud', err)
    })    
})

server.on('error',(err)=>{
    console.error('Ocurrio un error',err)
})

server.on('stream',(stream,headers,flags)=>{
    const method = headers[HTTP2_HEADER_METHOD]
    const path = headers[HTTP2_HEADER_PATH]

    console.table([
        {accion: 'method', valor: method},
        {accion: 'path', valor: path}
    ])

    stream.respond({
        [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain',
        [HTTP2_HEADER_STATUS]: 200
    })

    stream.write('Ejemplo HTTP version 2')
    stream.end('Node.js')
})

const port = 15500
server.listen(port,()=>{
    console.log(`El servidor esta escuchando en el puerto ${port}`)
})