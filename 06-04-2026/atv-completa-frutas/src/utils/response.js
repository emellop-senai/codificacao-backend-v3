export function sendSuccess(
  res,
  {
    statusCode = 200,
    message = "Operação realizada com sucesso",
    data = null,
  } = {},
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res,
  {
    statusCode = 500,
    message = "Erro interno do servidor",
    details = null,
  } = {},
) {
  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
}
