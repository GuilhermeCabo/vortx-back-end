import CallCost from "../entities/CallCost";
import ICallCostsRepository, { IFindCallCost } from "./interfaces/ICallCostsRepository";

export default class CallCostsRepository implements ICallCostsRepository {
  private callCosts: CallCost[];

  constructor() {
    this.callCosts = [
      {
        from_city: 11,
        to_city: 16,
        costPerMinute: 1.9,
      },
      {
        from_city: 11,
        to_city: 17,
        costPerMinute: 1.7,
      },
      {
        from_city: 11,
        to_city: 18,
        costPerMinute: 0.9,
      },
      {
        from_city: 16,
        to_city: 11,
        costPerMinute: 12.9,
      },
      {
        from_city: 17,
        to_city: 11,
        costPerMinute: 2.7,
      },
      {
        from_city: 18,
        to_city: 11,
        costPerMinute: 1.9,
      },
    ];
  }

  public async find({
    from_city,
    to_city,
  }: IFindCallCost): Promise<CallCost | undefined> {
    const findCallCost = this.callCosts.find(
      (callCost) =>
        callCost.from_city === from_city && callCost.to_city === to_city
    );

    return findCallCost;
  }
}
