const { Router } = require('express')
const express = require('express')
const router = express.Router()

const clientes = [
    {
        id: 1,
        nombre: 'alejandro',
        edad: 24
    },
    {
        id: 2,
        nombre: 'Mario',
        edad: 25
    },
    {
        id: 3,
        nombre: 'Andrea',
        edad: 22
    }
]

router.get('/', (req, res, next) => {
    res.json(clientes)
})

router.get('/:id', (req, res, next) => {
    try {
        const idCliente = req.params.id
        if (!Number.isInteger(parseInt(idCliente))) {
            return res.json({ error: 500, message: 'Error en la petición.' })
        }

        const cliente = clientes.find(c => c.id == idCliente)
        if (!idCliente) {
            return res.json({ error: 404, message: `No se ha encontrado el cliente con el id ${idCliente} :(` })
        }
        return res.json(cliente)
    } catch (error) {
        return res.json({ error: 500, message: 'Error' })
    }
})

module.exports = router