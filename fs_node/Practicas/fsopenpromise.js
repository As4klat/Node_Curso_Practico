const fs = require('fs')
const fsPromises = fs.promises

async function LeerArchivo(archivo){
    let arch
    try{
        arch = await fsPromises.open(archivo,'r')
        const bytes = Buffer.alloc(1024)
        const archRead = await arch.read(bytes,0,bytes.length,0)
        console.log(archRead.toString())
    }finally{
        if(arch !== undefined) await arch.close()
    }
}

LeerArchivo('./archivos/archivo.txt')