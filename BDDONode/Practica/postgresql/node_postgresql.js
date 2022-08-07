const {Pool} = require('pg')

const config = {
    user: 'ra',
    host: 'localhost',
    database: 'nodetest',
    password: 'ra12345',
    port: '5432'
}

const pool = new Pool(config)

async function Consulta(){
    try{
        const consulta = `SELECT cli.Nombre || ', ' || cli.Apellido AS Cliente, cli.Edad, clitel.telefono as Telefono FROM Clientes cli INNER JOIN ClientesTelefonos clitel ON cli.id = clitel.idCliente;`
        let resultado = await pool.query(consulta)
        console.table(resultado.rows)
    }catch(err){
        console.log(err)
    }
}

async function InsertarCliente(){
    const client = await pool.connect()
    
    const cliente = {
        Nombre: 'Cliente 4',
        Apellido: 'Apellido 4',
        Edad: 44
    }

    try{
        const consulta = `INSERT INTO clientes(Nombre,Apellido,Edad) VALUES('${cliente.Nombre}','${cliente.Apellido}','${cliente.Edad}') RETURNING id;`
        const res = await client.query(consulta)
        await client.query('COMMIT')
        console.log('La transación finalizó satisfactoriamente!')
    }catch(err){
        await client.query('ROLLBACK')
        console.log('Ocurrio un error al finalizar la trasacción',err)
    } finally {
        
    }
}

InsertarCliente()
Consulta()