const express = require('express')
const router = express.Router()

router.get('/clientes/:id',(req,res,next)=>{
    console.log('headers.host:', req.headers.host)
    console.log('originalUrl:', req.originalUrl)
    
    const clientes = [
        {
            id: 1,
            nombre: 'Cliente1',
            apellido: 'Apellido1',
            edad: 54
        },
        {
            id: 2,
            nombre: 'Cliente2',
            apellido: 'Apellido2',
            edad: 33
        },
        {
            id: 3,
            nombre: 'Cliente3',
            apellido: 'Apellido3',
            edad: 74
        }
    ]

    //Obtener parametro
    const idCLiente = req.params.id
    if(!Number.isInteger(parseInt(idCLiente))){
        return res.send({error: 500, message: 'El identificador del cliente es incorrecto.'})
    }

    const cliente = clientes.find((cli) => cli.id === parseInt(idCLiente))
    if(!cliente){
        return res.send({error: 404, message: `El cliente con el id ${idCLiente} no existe.`})
    }
    
    res.json(cliente)
})

module.exports = router