import { injectable, inject } from "tsyringe";
import roundTo from "round-to";

import AppError from "@shared/errors/AppErrors";

import ICallRequest from "../dtos/ICallRequest";
import IPhonePackagesRepository from "@modules/calls/repositories/interfaces/IPhonePackagesRepository";
import ICallCostsRepository from "../repositories/interfaces/ICallCostsRepository";

interface IResponse {
  withPackage: number;
  withoutPackage: number;
}

@injectable()
export default class CalculateCallCostService {
  constructor(
    @inject("PhonePackagesRepository")
    private phonePackagesRepository: IPhonePackagesRepository,

    @inject("CallCostsRepository")
    private callCostsRepository: ICallCostsRepository
  ) {}

  public async execute({
    from_city_code,
    minutes,
    package_id,
    to_city_code,
  }: ICallRequest): Promise<IResponse> {
    const findPackage = await this.phonePackagesRepository.find(package_id);

    if (!findPackage) {
      throw new AppError("Plano não registrado!", 404);
    }

    const callCost = await this.callCostsRepository.find({
      from_city: from_city_code,
      to_city: to_city_code,
    });

    if (!callCost) {
      throw new AppError(
        "O custo de ligação entre essas duas áreas não está registrado",
        404
      );
    }

    const withoutPackage = minutes * callCost.costPerMinute;

    if (minutes <= findPackage.freeMinutes) {
      return {
        withPackage: 0,
        withoutPackage,
      };
    }

    const withPackage =
      (minutes - findPackage.freeMinutes) * (callCost.costPerMinute * 1.1);

    const roundedWithPackage = roundTo(withPackage, 2);
    const roundedWithoutPackage = roundTo(withoutPackage, 2);

    return {
      withPackage: roundedWithPackage,
      withoutPackage: roundedWithoutPackage,
    };
  }
}
