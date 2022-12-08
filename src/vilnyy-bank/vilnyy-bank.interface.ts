export interface MonoBankRawResponse {
  clientType: string;
  Ps: string;
  name: string;
  avatar: string;
  currency: string;
  isReplenishable: boolean;
  description: string;
  jarGoal: number;
  jarAmount?: number;
  extJarId: string;
  ownerName: string;
  jarStatus: string;
  refererLink: string;
  caption: string;
  config: {
    minAmount: number;
    maxAmount: number;
  };
  googleApplePay: boolean;
  rate: {
    eur: {
      buy: number;
      sale: number;
    };
  };
  feeForeignCard: number;
}

export interface MonoBankResponse extends MonoBankRawResponse {
  bankId: string;
}

export type SettledMonoBankPromises =
  | { status: 'fulfilled'; value: MonoBankResponse }
  | { status: 'rejected' };
