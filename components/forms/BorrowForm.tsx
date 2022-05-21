import { useForm } from "react-hook-form";
import { PAYMENT_TOKEN_ADDRESSES } from "@src/constants/addresses";
import { convertDayToSeconds } from "@src/helpers";
import {
  BondDetails,
  PaymentTokenOptions,
  MaturityDateOptions,
} from "./common";

const defaultValues = {
  amount: 0,
  interestRate: 10,
};

interface formProps {
  formDetails: any;
  setFormDetails: (formDetails: any) => void;
  createBond: () => void;
}

export const BorrowForm: React.FC<formProps> = ({
  setFormDetails,
  createBond,
}) => {
  const { register, handleSubmit, watch } = useForm<BondDetails>({
    defaultValues,
  });
  const watchAmount = watch("amount", 0);
  const watchPaymentToken = watch("paymentToken", "USDC");
  const watchInterestRate = watch("interestRate", 0);

  const onSubmit = handleSubmit(async (data) => {
    setFormDetails(data);
    await createBond();
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
          <span className="text-gray-700">Token Symbol</span>
        </label>
        <input
          type="text"
          id="text"
          className="form-input mx-2 rounded-md"
          {...register("symbol", { required: true })}
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
          {PaymentTokenOptions.map((option, idx) => (
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
          {MaturityDateOptions.map((option, idx) => (
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
        interest rate of {watchInterestRate ? watchInterestRate : 0} % to be
        sold for {watchPaymentToken}. Your bond tokens will be listed in Lend.
      </div>

      <input className="submitButton m-2" type="submit"></input>
    </form>
  );
};
