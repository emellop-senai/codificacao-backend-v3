import express from "express"

const app = express()
const port = 3000

let alunos = [
    { id: 1, nome: "Édio", idade: 35 },
    { id: 2, nome: "Vanessa", idade: 52 },
    { id: 3, nome: "Schuster", idade: 13 }
]

app.get('/', (req, res) => {
    res.send('Vanessa Schuster')
})

app.get('/alunos/getAll', (req, res) => {
    res.json({
        sucess: true,
        data: alunos
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
