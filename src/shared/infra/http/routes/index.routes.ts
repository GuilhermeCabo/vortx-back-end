import { Router } from "express";

import callsRoutes from "@modules/calls/infra/http/routes/calls.routes";

const app = Router();

app.use("/calls", callsRoutes);

export default app;
