import { convertDayToSeconds } from "@src/helpers";

export enum PaymentToken {
  USDC = 'USDC',
  FRAX = 'FRAX',
  DAI = 'DAI'
}

type BondDetails = {
  daoName: string;
  symbol: string;
  amount: number;
  paymentToken: PaymentToken;
  maturityDate: string;
  interestRate: number;
};

// TODO: get the payment token and maturity options from an API.
const PaymentTokenOptions = [
  { label: "USDC", value: "USDC" },
  { label: "FRAX", value: "FRAX" },
  { label: "DAI", value: "DAI" },
];

const MaturityDateOptions = [
  { label: "1 Week", value: convertDayToSeconds(7) },
  { label: "2 Weeks", value: convertDayToSeconds(14) },
  { label: "4 Weeks", value: convertDayToSeconds(30) },
];

export { PaymentTokenOptions, MaturityDateOptions };
export type { BondDetails };
