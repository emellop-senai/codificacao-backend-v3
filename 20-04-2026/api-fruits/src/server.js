import express from 'express'
import { fruitsRouter } from './routes/fruits.routes.js'

const app = express()

app.use(express.json())
const PORT = 3000

app.get("/", (req, res) => {
    res.json("Hello World")
})

app.use("/fruits", fruitsRouter)


app.listen(PORT, () => {
    console.log(`API funcionando em: http://localhost:${PORT}`);

})