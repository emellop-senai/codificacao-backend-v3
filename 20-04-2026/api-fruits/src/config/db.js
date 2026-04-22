import fs from 'fs/promises'

export async function read() {
    const data = await fs.readFile("./src/config/fruits.json", "utf-8")
    const fruits = JSON.parse(data)
    return fruits
}

export async function write(params) {
    const data = JSON.stringify(params, null, 2)
    await fs.writeFile("./src/config/fruits.json", data, "utf-8")
}