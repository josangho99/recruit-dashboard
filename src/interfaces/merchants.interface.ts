const MERCHANTS_TYPE = ["READY", "ACTIVE", "INACTIVE", "CLOSED"] as const;
export type MerchantType = (typeof MERCHANTS_TYPE)[number];
export { MERCHANTS_TYPE };

export interface MerchantsItem {
  mchtCode: string;
  mchtName: string;
  status: MerchantType;
  bizType: string;
}

export interface MerchantsResponse {
  status: number;
  message: string;
  data: MerchantsItem[];
}

export interface MerchantsDetail {
  mchtCode: string;
  mchtName: string;
  status: MerchantType;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}
