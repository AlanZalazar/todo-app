import { Router } from "express";
import { index, show, store, update, destroy, clearAll } from "./Controller.js";

export const tareasRouter = Router();

tareasRouter.get("/tareas", index);
tareasRouter.get("/tareas/:id", show);
tareasRouter.post("/tareas", store);
tareasRouter.put("/tareas/:id", update);
tareasRouter.delete("/tareas/:id", destroy);
tareasRouter.delete("/tareas", clearAll);
