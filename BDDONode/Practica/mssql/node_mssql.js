const sql = require('mssql')

const config = {
    server: 'localhost',
    user: 'sa',
    password: 'nero',
    database: 'nodetest',
    options: {
        instanceName: 'MSSQLSERVER',
        trustedConnection: true,
        enableArithAbort: true
    }
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect()

async function Consulta(){
    await poolConnect

    try {
        const consulta = 'SELECT cli.Nombre, cli.Apellido, AS Cliente, cli.Edad, clitel.telefono AS Telefono FROM Clientes cli INNER JOIN ClientesTelefonos clitel on cli.id = clitel.idCliente'
        let resultado = await pool.request().query(consulta)
        console.table(resultado.recordset)
    } catch (error) {
        console.error(error)
    }
}

Consulta()