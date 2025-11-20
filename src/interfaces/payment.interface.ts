const PAY_TYPES = ["ONLINE", "DEVICE", "MOBILE", "VACT", "BILLING"] as const;
export type PayType = (typeof PAY_TYPES)[number];
export { PAY_TYPES };

const PAY_STATUS = ["PENDING", "SUCCESS", "FAILED", "CANCELLED"] as const;
export type PayStatus = (typeof PAY_STATUS)[number];
export { PAY_STATUS };

export interface CountryData {
  value: string;
  subValue: string;
  currencyUnit: string;
}

export interface PaymentItem {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: PayType;
  status: PayStatus;
  paymentAt: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: PaymentItem[];
}

export interface ExchangeResponse {
  pkid: number;
  count: number;
  country: CountryData[];
  calculatorMessage: string;
}

export interface CountAccumulator {
  successCount: number;
  attemptCount: number;
}
