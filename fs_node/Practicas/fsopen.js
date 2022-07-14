const fs = require('fs')

fs.open('./archivos/archivo.txt','r',(err, descriptor) => {
    if(err) return console.error(err)

    var bytes = Buffer.alloc(1024)

    fs.read(descriptor,bytes,0,bytes.length,0,(err1, size, bytes)=>{
        if(err1) throw err1

        if(size>0){
            console.log(bytes.toString())
        }

        fs.close(descriptor,(err2)=>{
            if(err2) throw err2
        })
    })
})