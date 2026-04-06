import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../data/fruits.json");

class FruitService {
  async readData() {
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");

      if (!fileContent.trim()) {
        return [];
      }

      return JSON.parse(fileContent);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.writeData([]);
        return [];
      }

      if (error instanceof SyntaxError) {
        throw new AppError("O arquivo JSON de frutas está inválido.", 500);
      }

      throw new AppError("Erro ao ler os dados das frutas.", 500);
    }
  }

  async writeData(data) {
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      throw new AppError("Erro ao salvar os dados das frutas.", 500);
    }
  }

  async getAll() {
    return await this.readData();
  }

  async getById(id) {
    const fruits = await this.readData();
    return fruits.find((fruit) => fruit.id === Number(id)) || null;
  }

  async create(nome) {
    const fruits = await this.readData();

    const newFruit = {
      id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
      nome,
    };

    fruits.push(newFruit);
    await this.writeData(fruits);

    return newFruit;
  }

  async updatePatch(id, nome) {
    const fruits = await this.readData();
    const index = fruits.findIndex((fruit) => fruit.id === Number(id));

    if (index === -1) {
      return null;
    }

    fruits[index].nome = nome;
    await this.writeData(fruits);

    return fruits[index];
  }

  async updatePut(id, newData) {
    const fruits = await this.readData();
    const index = fruits.findIndex((fruit) => fruit.id === Number(id));

    if (index === -1) {
      return null;
    }

    const updatedFruit = {
      id: Number(id),
      nome: newData.nome,
    };

    fruits[index] = updatedFruit;
    await this.writeData(fruits);

    return updatedFruit;
  }

  async delete(id) {
    const fruits = await this.readData();
    const index = fruits.findIndex((fruit) => fruit.id === Number(id));

    if (index === -1) {
      return false;
    }

    fruits.splice(index, 1);
    await this.writeData(fruits);

    return true;
  }
}

export const fruitService = new FruitService();
