import fs from "fs/promises"

// JSON FILE

async function readFruits() {
    const data = await fs.readFile("./fruits.json", "utf-8")
    const fruits = JSON.parse(data)
    return fruits;
}

// Mozile mdn
async function writeFruits(fruits) {
    const data = JSON.stringify(fruits, null, 2)
    await fs.writeFile("./fruits.json", data, "utf-8")

}

// const fruits = await readFruits()
// fruits.push({ id: 4, nome: "Naranja" })
// await writeFruits(fruits)

// APIII

async function getAll() {
    const fruits = await readFruits()
    return fruits
}