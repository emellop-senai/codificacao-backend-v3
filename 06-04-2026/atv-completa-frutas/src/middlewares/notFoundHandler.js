import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  return sendError(res, {
    statusCode: 404,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
}
