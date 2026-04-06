import express from "express";
import fruitRoutes from "./routes/fruit.routes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sendSuccess } from "./utils/response.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: "API de frutas funcionando.",
    data: {
      endpoints: {
        listar: "GET /fruits",
        buscarPorId: "GET /fruits/:id",
        criar: "POST /fruits",
        atualizarParcial: "PATCH /fruits/:id",
        substituir: "PUT /fruits/:id",
        remover: "DELETE /fruits/:id",
      },
    },
  });
});

app.use("/fruits", fruitRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
