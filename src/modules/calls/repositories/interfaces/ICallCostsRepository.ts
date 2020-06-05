import CallCost from "../../entities/CallCost";

export interface IFindCallCost {
  from_city: number;
  to_city: number;
}

export default interface ICallCostsRepository {
  find({ from_city, to_city }: IFindCallCost): Promise<CallCost | undefined>;
}
