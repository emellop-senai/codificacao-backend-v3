// Mock de dados
const students = [
    { id: 1, nome: "Fernando Zhang" },
    { id: 2, nome: "Pietra Kruger" },
    { id: 3, nome: "Sarah Cristine" }
]

class StudentService {
    // Method
    getAll() {
        return students
    }

    getById() {

    }

    create() {

    }

    updatePut() {

    }

    updatePatch() {

    }

    delete() {

    }
}

export const studentService = new StudentService()