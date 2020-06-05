import { Router } from "express";
import CallsController from "../controllers/CallsController";

const callsRouter = Router();
const callsController = new CallsController();

callsRouter.post("/", callsController.create);

export default callsRouter;
