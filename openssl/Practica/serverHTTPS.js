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
    const method = headers[HTTP2_HEADER_METHOD]
    const path = headers[HTTP2_HEADER_PATH]

    console.table([
        {accion: 'method', valor: method},
        {accion: 'path', valor: path}
    ])

    stream.respond({
        [HTTP2_HEADER_CONTENT_TYPE]: 'text/html',
        [HTTP2_HEADER_STATUS]: 200
    })

    stream.write('<!doctype html>\n')
    stream.end(`
        <html>
            <head>
                <title>Prueba de servidor HTTP seguro con Node.js</title>
                <script>
                    function saludar(){
                        alert('Hola mundo')
                    }
                </script>
            </head>
            <body>
                <hi>Prueba de pagina web</hi>
                <h2>con Node.js</h2>
                <input type="button" value="Mensaje" onClick="javascript:saludar();"/>
            </body>
        </html>            
    `)
})

const port = 8443
server.listen(port,()=>{
    console.log(`El servidor SEGURO esta escuchando en el puerto ${port}`)
})