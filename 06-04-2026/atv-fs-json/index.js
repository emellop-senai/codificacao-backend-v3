import fs from "fs/promises"

// FUNCIONALIDADES DO BANCO LOCAL

// Ler arquivo
async function readFruits() {
    const data = await fs.readFile("./fruits.json", "utf-8")
    const fruits = JSON.parse(data)
    return fruits
}

// Salvar no arquivo
async function writeFruits(fruits) {
    const data = JSON.stringify(fruits, null, 2)
    await fs.writeFile("./fruits.json", data, "utf-8")
}

// CRIAR O CRUD

async function getAll() {
    const fruits = await readFruits()
    return fruits
}
// console.log(await getAll());

async function getById(id) {
    const fruits = await readFruits()
    const fruit = fruits.find((fruit) => fruit.id === id)
    return fruit
}
// console.log(await getById(4));

async function create(nome) {
    const fruits = await readFruits()

    const newFruit = {
        id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
        nome: nome
    }

    fruits.push(newFruit)

    await writeFruits(fruits)

    return newFruit
}

// console.log(await create("Mamão"));

async function update(id, nome) {
    const fruits = await readFruits()

    const index = fruits.findIndex((fruit) => fruit.id === id)

    if (index === -1) {
        return null
    }

    fruits[index].nome = nome

    await writeFruits(fruits)
    return fruits[index]
}

// console.log(await update(1, "Lucas"));

async function deleteFruit(id) {
    const fruits = await readFruits()

    const index = fruits.findIndex((fruit) => fruit.id === id)

    if(index === -1) {
        return null
    }

    fruits.splice(index, 1)

    await writeFruits(fruits)

    return true;
}

console.log(await deleteFruit(1));
