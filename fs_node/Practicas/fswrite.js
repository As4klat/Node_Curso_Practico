const fs = require('fs')

fs.open('./archivos/archivo2.txt', 'w', (err,descriptor)=>{
    if(err) console.error(err)

    let bytes = new Uint8Array(Buffer.from('Hola mundo desde js!'))

    fs.write(descriptor,bytes,0,bytes.length,0,(err1,size,bytes)=>{
        if(err1) throw err1

        fs.close(descriptor,(err2)=>{
            if(err2) throw err2
        })
        console.log(`Se escribieron ${bytes.length} bytes.`)
    })
})