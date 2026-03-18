import express from 'express'
import { studentService } from '../services/studentServices.js'

const route = express.Router()


route.get("/", (req, res) => {
    res.json(studentService.getAll())
})



export default route