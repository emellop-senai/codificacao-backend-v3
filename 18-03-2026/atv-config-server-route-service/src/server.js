import express from 'express'
import route from './routes/studentRoutes.js'

const app = express()
app.use(express.json())
const PORT = 3000


app.get("/", (req, res) => {
    res.json("Hello World!")
})

app.use("/students", route)

app.listen(PORT, () => {
    console.log(`A aplicação está rodando em: http://localhost:${PORT}`)
})