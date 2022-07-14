const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pagina1.html')
})

app.listen(port, () => console.log(`El servidor esta escuchando en el puerto ${port}.\nDirección: http://localhost:${port}/`))