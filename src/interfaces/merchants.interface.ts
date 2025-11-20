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

export interface MerchantsRanking {
  mchtCode: string;
  totalAmount: number;
}

export interface CountMerchants {
  activeCount: number;
  inactiveCount: number;
  closedCount: number;
  readyCount: number;
}

export interface PodiumStepProps {
  mchtName: string;
  amount: number;
  rank: 1 | 2 | 3;
}
