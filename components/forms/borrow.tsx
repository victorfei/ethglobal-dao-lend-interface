import { useForm } from "react-hook-form";
import { PAYMENT_TOKEN_ADDRESSES } from "@src/constants/addresses";
import { convertDayToSeconds } from "@src/helpers";

type Inputs = {
  daoName: string;
  amount: number;
  paymentToken: string;
  maturityDate: string;
  interestRate: number;
};

const paymentTokenOptions = [
  { label: "USDC", value: "USDC" },
  { label: "FRAX", value: "FRAX" },
  { label: "DAI", value: "DAI" },
];

const maturityDateOptions = [
  { label: "1 Week", value: convertDayToSeconds(7) },
  { label: "2 Weeks", value: convertDayToSeconds(14) },
  { label: "4 Weeks", value: convertDayToSeconds(30) },
];

const defaultValues = {
  amount: 0,
  interestRate: 10,
};

export const BorrowForm: React.FC<any> = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>({ defaultValues });
  const watchAmount = watch("amount", 0);
  const watchPaymentToken = watch("paymentToken", "USDC");
  const watchwatchInterestRate = watch("interestRate", 0);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="m-10 max-w-xl" onSubmit={onSubmit}>
      <div className="m-2">Borrow popular ERC20 tokens at a fixed rate</div>
      <div className="grid grid-cols-3 p-2">
        <label>
          <span className="text-gray-700">Dao Name</span>
        </label>
        <input
          type="text"
          id="text"
          className="form-input mx-2 rounded-md"
          {...register("daoName", { required: true })}
        ></input>
      </div>

      <div className="grid grid-cols-3 p-2">
        <label>
          <span className="text-gray-700">Amount</span>
        </label>

        <input
          type="number"
          id="number"
          className="form-input mx-2 rounded-md"
          {...register("amount", { required: true, min: 1 })}
        ></input>

        <select
          id="email"
          className="form-select mx-2 rounded-md"
          {...register("paymentToken")}
        >
          {paymentTokenOptions.map((option, idx) => (
            <option value={option.value} key={option.value + idx}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 p-2">
        <label>
          <span className="text-gray-700">Maturity</span>
        </label>

        <select
          id="email"
          className="form-select mx-2 rounded-md"
          {...register("maturityDate")}
        >
          {maturityDateOptions.map((option, idx) => (
            <option value={option.value} key={option.value + idx}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 p-2">
        <label>
          <span className="text-gray-700">Interest Rate</span>
        </label>

        <input
          type="number"
          id="number"
          className="form-input mx-2 rounded-md"
          {...register("interestRate", { required: true })}
        ></input>
      </div>
      <div className="m-2">
        You are minting {watchAmount ? watchAmount : 0} bond tokens at an
        interest rate of {watchwatchInterestRate ? watchwatchInterestRate : 0} % to be sold
        for {watchPaymentToken}. Your bond tokens will be listed in Lend.
      </div>

      <input className="submitButton m-2" type="submit"></input>
    </form>
  );
}
