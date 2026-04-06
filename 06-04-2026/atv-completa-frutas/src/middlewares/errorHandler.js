import { sendError } from "../utils/response.js";

export function errorHandler(err, req, res, next) {
  console.error("Erro capturado pelo middleware global:", err);

  if (err.isOperational) {
    return sendError(res, {
      statusCode: err.statusCode || 500,
      message: err.message,
      details: err.details || null,
    });
  }

  return sendError(res, {
    statusCode: 500,
    message: "Erro interno do servidor",
    details: process.env.NODE_ENV === "development" ? err.message : null,
  });
}
