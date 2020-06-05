import PhonePackage from "../entities/PhonePackage";
import IPhonePackagesRepository from "./interfaces/IPhonePackagesRepository";

export default class PhonePackagesRepository
  implements IPhonePackagesRepository {
  private phonePackages: PhonePackage[];

  constructor() {
    this.phonePackages = [
      {
        id: 1,
        name: "FaleMais 30",
        freeMinutes: 30
      },
      {
        id: 2,
        name: "FaleMais 60",
        freeMinutes: 60
      },
      {
        id: 3,
        name: "FaleMais 120",
        freeMinutes: 120
      },
    ];
  }

  public async find(id: number): Promise<PhonePackage | undefined> {
    const findPhonePackage = this.phonePackages.find(
      (phonePackage) => phonePackage.id === id
    );

    return findPhonePackage;
  }
}
