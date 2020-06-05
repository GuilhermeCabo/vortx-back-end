import { container } from "tsyringe";

import IPhonePackagesRepository from "@modules/calls/repositories/interfaces/IPhonePackagesRepository";
import PhonePackagesRepository from "@modules/calls/repositories/PhonePackagesRepository";

import ICallCostsRepository from "@modules/calls/repositories/interfaces/ICallCostsRepository";
import CallCostsRepository from "@modules/calls/repositories/CallCostsRepository";

container.registerSingleton<IPhonePackagesRepository>(
  "PhonePackagesRepository",
  PhonePackagesRepository
);

container.registerSingleton<ICallCostsRepository>(
  "CallCostsRepository",
  CallCostsRepository
);
