import { AppError } from "../utils/appError.js";

export function validateFruitId(req, res, next) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return next(
      new AppError("O parâmetro 'id' deve ser um número inteiro válido.", 400),
    );
  }

  next();
}

export function validateCreateFruit(req, res, next) {
  const { nome } = req.body;

  if (nome === undefined) {
    return next(new AppError("O campo 'nome' é obrigatório.", 400));
  }

  if (typeof nome !== "string") {
    return next(new AppError("O campo 'nome' deve ser uma string.", 400));
  }

  if (!nome.trim()) {
    return next(new AppError("O campo 'nome' não pode estar vazio.", 400));
  }

  req.body.nome = nome.trim();
  next();
}

export function validatePutFruit(req, res, next) {
  const { nome } = req.body;

  if (nome === undefined) {
    return next(new AppError("Para PUT, o campo 'nome' é obrigatório.", 400));
  }

  if (typeof nome !== "string") {
    return next(new AppError("O campo 'nome' deve ser uma string.", 400));
  }

  if (!nome.trim()) {
    return next(new AppError("O campo 'nome' não pode estar vazio.", 400));
  }

  req.body.nome = nome.trim();
  next();
}

export function validatePatchFruit(req, res, next) {
  const { nome } = req.body;

  if (req.body.nome === undefined) {
    return next(
      new AppError("Para PATCH, informe ao menos o campo 'nome'.", 400),
    );
  }

  if (typeof nome !== "string") {
    return next(new AppError("O campo 'nome' deve ser uma string.", 400));
  }

  if (!nome.trim()) {
    return next(new AppError("O campo 'nome' não pode estar vazio.", 400));
  }

  req.body.nome = nome.trim();
  next();
}
