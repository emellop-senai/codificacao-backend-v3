// Mock de dados

const fruits = [
    { id: 1, nome: "Maça" },
    { id: 2, nome: "Pera" }
]

class FruitService {
    getAll() {
        return fruits
    }

    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }

        fruits.push(newFruit)

        return newFruit
    }

    updatePatch(id, nome) {
        const index = fruits.findIndex((f) => f.id === parseInt(id));


        if (index === -1) return null;

        if (nome) {
            fruits[index].nome = nome;
        }

        return fruits[index];
    }

    updatePut(id, newData) {
        const index = fruits.findIndex(f => f.id === parseInt(id));

        if (index === -1) return null;

        const updatedFruit = { id: parseInt(id), ...newData };

        fruits[index] = updatedFruit;

        return updatedFruit;
    }

    delete(id) {
        const index = fruits.findIndex(f => f.id === parseInt(id));

        if (index === -1) return false;

        fruits.splice(index, 1);
        return true;
    }

}

export const fruitService = new FruitService()