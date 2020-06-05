import "reflect-metadata";

import AppError from "@shared/errors/AppErrors";

import PhonePackagesRepository from "@modules/calls/repositories/PhonePackagesRepository";
import CallCostsRepository from "@modules/calls/repositories/CallCostsRepository";

import CalculateCallCostService from "./CalculateCallCostService";

let phonePackagesRepository: PhonePackagesRepository;
let callCostsRepository: CallCostsRepository;
let calculateCallCost: CalculateCallCostService;

describe("CalculateCallCost", () => {
  beforeEach(() => {
    phonePackagesRepository = new PhonePackagesRepository();
    callCostsRepository = new CallCostsRepository();
    calculateCallCost = new CalculateCallCostService(
      phonePackagesRepository,
      callCostsRepository
    );
  });

  it("should be able to calculate a call cost", async () => {
    const callCost = await calculateCallCost.execute({
      from_city_code: 11,
      to_city_code: 16,
      minutes: 90,
      package_id: 1,
    });

    expect(callCost).toEqual({
      withPackage: 125.4,
      withoutPackage: 171,
    });
  });

  it("should return zero cost for the call with the package when the call time is less than the free minutes from the package", async () => {
    const callCost = await calculateCallCost.execute({
      from_city_code: 11,
      minutes: 30,
      package_id: 1,
      to_city_code: 16,
    });

    expect(callCost).toEqual({
      withPackage: 0,
      withoutPackage: 57,
    });
  });

  it("should not be able to calculate the costs withount informing a valid package", async () => {
    await expect(
      calculateCallCost.execute({
        from_city_code: 11,
        minutes: 90,
        package_id: 0,
        to_city_code: 16,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to calculate the costs of areas wich do not exist", async () => {
    await expect(
      calculateCallCost.execute({
        from_city_code: 12,
        minutes: 90,
        package_id: 1,
        to_city_code: 16,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
