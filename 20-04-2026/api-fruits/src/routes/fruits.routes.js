import express from 'express'
import { fruitsService } from '../services/fruits.service.js'

export const fruitsRouter = express.Router()

fruitsRouter.post("/", async (req, res) => {
    const { nome } = req.body
    const fruit = await fruitsService.create(nome)
    res.json(fruit)
})

fruitsRouter.get("/", async (req, res) => {
    const fruits = await fruitsService.getAll()
    res.json(fruits)
})



