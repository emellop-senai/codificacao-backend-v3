import express from "express";
import { fruitService } from "../services/fruit.service.js";
import { AppError } from "../utils/appError.js";
import { sendSuccess } from "../utils/response.js";
import {
  validateFruitId,
  validateCreateFruit,
  validatePutFruit,
  validatePatchFruit,
} from "../middlewares/validateFruit.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const fruits = await fruitService.getAll();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Frutas listadas com sucesso.",
      data: fruits,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateFruitId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const fruit = await fruitService.getById(id);

    if (!fruit) {
      throw new AppError("Fruta não encontrada.", 404);
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: "Fruta encontrada com sucesso.",
      data: fruit,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateFruit, async (req, res, next) => {
  try {
    const { nome } = req.body;
    const newFruit = await fruitService.create(nome);

    return sendSuccess(res, {
      statusCode: 201,
      message: "Fruta criada com sucesso.",
      data: newFruit,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  validateFruitId,
  validatePatchFruit,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const updatedFruit = await fruitService.updatePatch(id, nome);

      if (!updatedFruit) {
        throw new AppError(
          "Fruta não encontrada para atualização parcial.",
          404,
        );
      }

      return sendSuccess(res, {
        statusCode: 200,
        message: "Fruta atualizada parcialmente com sucesso.",
        data: updatedFruit,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  validateFruitId,
  validatePutFruit,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const updatedFruit = await fruitService.updatePut(id, { nome });

      if (!updatedFruit) {
        throw new AppError("Fruta não encontrada para substituição.", 404);
      }

      return sendSuccess(res, {
        statusCode: 200,
        message: "Fruta substituída com sucesso.",
        data: updatedFruit,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", validateFruitId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await fruitService.delete(id);

    if (!deleted) {
      throw new AppError("Fruta não encontrada para exclusão.", 404);
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: "Fruta removida com sucesso.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
