const sql = require('mssql')

const config = {
    server: 'DESKTOP-NHK19RH',
    user: 'ra',
    password: 'ra12345',
    database: 'nodetest',
    options: {
        instanceName: 'MSSQLSERVER',
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect()

async function Consulta(){
    await poolConnect

    try {
        const consulta = `SELECT (cli.Nombre + ', ' + cli.Apellido) AS Cliente, cli.Edad, clitel.telefono AS Telefono FROM Clientes cli INNER JOIN ClientesTelefonos clitel on cli.id = clitel.idCliente`
        let resultado = await pool.request().query(consulta)
        console.table(resultado.recordset)
    } catch (error) {
        console.log(error)
    }
    (await poolConnect).close()
}

async function insertarCliente() {
    await poolConnect

    const transaction = new sql.Transaction(pool)

    transaction.begin(err => {
        if(err){
            console.log('Ocurrio un error alk iniciar la transacción', err)
            return
        }

        const cliente = { 
            Nombre: 'Cliente 4',
            Apellido: 'Apellido 4',
            Edad: 44
        }

        const request = new sql.Request(transaction)
        const consulta = `INSERT INTO Clientes(Nombre,Apellido,Edad) VALUES ('${cliente.Nombre}','${cliente.Apellido}','${cliente.Edad}')`
        console.log(consulta)
        request.query(consulta,(err,result)=>{
            if(err){
                return console.log('Ocurrió un error al inciar ejecutar el insert',err)
            }

            transaction.commit(err =>{
                if(err){
                    return console.log('Ocurrió un error al finalizar la transación.',err)
                }
                console.log('La transacción finalizó satisfactoriamente')
            })
        })
    })
}

insertarCliente()
Consulta()