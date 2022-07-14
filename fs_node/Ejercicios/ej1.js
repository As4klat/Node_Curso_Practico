const fs = require('fs')
const fsPromise = fs.promises

async function CrearArchivo(archivo){
    let contenido = new Uint8Array(Buffer.from('Ejercio 1 de node js curso practico.'))
    let arch = await fsPromise.writeFile(archivo,contenido)
}

CrearArchivo('./archivos/ejeciciosNode.txt')