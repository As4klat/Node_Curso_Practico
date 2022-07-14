const fsPromise = require("fs").promises

async function LeerArchivoYEscribir(archivo){
    let arch = await fsPromise.readFile(archivo)
    let content = arch.toString()
    if(content.includes('Modificación del archivo de ejercicios y lectura.')) content = content.replace('\nModificación del archivo de ejercicios y lectura.','')
    let contenido = new Uint8Array(Buffer.from(`${content}\nModificación del archivo de ejercicios y lectura.`))
    await fsPromise.writeFile(archivo,contenido)
    let leer = await fsPromise.readFile(archivo)
    console.log(leer.toString())
}

LeerArchivoYEscribir('./archivos/ejeciciosNode.txt')