import { container } from "tsyringe";
import { Request, Response } from "express";
import joi from "@hapi/joi";

import AppError from "@shared/errors/AppErrors";

import CalculateCallCostService from "@modules/calls/services/CalculateCallCostService";

export default class CallsController {
  public async create(request: Request, response: Response) {
    const data = request.body;

    const schema = joi.object({
      from_city_code: joi.number().required(),
      to_city_code: joi.number().required(),
      minutes: joi.number().required().min(0),
      package_id: joi.number().required(),
    });

    try {
      await schema.validateAsync(data);
    } catch (error) {
      throw new AppError(
        "Erro ao enviar, por favor cheque seus dados",
        400
      );
    }

    const { from_city_code, minutes, package_id, to_city_code } = data;

    const calculateCallCost = container.resolve(CalculateCallCostService);

    const costs = await calculateCallCost.execute({
      from_city_code,
      minutes,
      package_id,
      to_city_code,
    });

    return response.status(200).json(costs);
  }
}
