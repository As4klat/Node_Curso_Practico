const express = require('express')
const app = express()

app.use(express.static('./public'))

const port = 5000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/p1', (req, res) => {
    res.sendFile(__dirname + '/public/pagina1.html')
})

app.listen(port, () => console.log(`El Servidor Web de Páginas Estáticas inició satisfactoriamente en el puerto ${port}.`))