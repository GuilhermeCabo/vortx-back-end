import PhonePackage from "../../entities/PhonePackage";

export default interface IPhonePackagesRepository {
  find(id: number): Promise<PhonePackage | undefined>;
}
