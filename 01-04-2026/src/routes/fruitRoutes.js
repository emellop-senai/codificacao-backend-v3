import express from 'express'
import { fruitService } from '../services/fruit.service.js'

const route = express.Router()

route.get("/", (req, res) => {
    const data = fruitService.getAll()
    res.json(data)
})

route.post("/", (req, res) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(404).json({ message: "É necessário informar um nome da fruta para criar uma fruta" })
    }

    const newFruit = fruitService.create(nome)

    res.json(newFruit)

})

route.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitService.getById(id)
    if (!fruit) {
        return res.status(404).json({ message: "Fruta não encontrada" })
    }

    res.json(fruit)
})

route.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    const fruitUpdated = fruitService.updatePatch(id, nome);

    if (!fruitUpdated) {
        return res.status(404).json({ message: "Fruta não encontrada para atualização" });
    }

    res.json(fruitUpdated);
});

route.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: "Dados insuficientes para substituição (nome é obrigatório)" });
    }

    const fruitUpdated = fruitService.updatePut(id, { nome });

    if (!fruitUpdated) {
        return res.status(404).json({ message: "Fruta não encontrada para substituição" });
    }

    res.json(fruitUpdated);
});

route.delete("/:id", (req, res) => {
    const { id } = req.params;

    const deleted = fruitService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: "Fruta não encontrada" });
    }

    res.status(204).send();
});



export default route