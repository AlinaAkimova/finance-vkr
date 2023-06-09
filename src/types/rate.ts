export interface IRate {
  id?: string;
  projectId: string;
  expertise: string;
  rate: number;
  startAt?: string;
}

export interface IRateAdd {
  projectId: string;
  expertise: string;
  rate: number;
  startAt?: string;
}

export enum ContractCurrencyVariant {
  rub = 'RUB',
  usd = 'USD'
}
