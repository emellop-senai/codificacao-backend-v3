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

/*app.get('/alunos/getAll', (req, res) => {
    res.json({
        sucess: true,
        data: alunos
    })

})*/

//GET - buscar aluno by id

app.get('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const aluno = alunos.find(a => a.id === id)
    if (!aluno) {
        return res.status(404).json({
            success: false,
            message: 'Aluno não encontrado'
        })
    }

    res.json({
        success: true,
        data: aluno
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
