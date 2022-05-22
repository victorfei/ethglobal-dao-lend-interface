import { useForm } from "react-hook-form";
import { Web3Provider } from "@ethersproject/providers";
import {
  BOND_FACTORY_ADDRESS,
  COLLATERAL_TOKEN_ADDRESS,
  PAYMENT_TOKEN_ADDRESSES,
} from "@src/constants/addresses";
import {
  BondDetails,
  PaymentTokenOptions,
  MaturityDateOptions,
  PaymentToken,
} from "./common";
import abis from "@src/abis";
import { ethers } from "ethers";

const defaultValues = {
  amount: 0,
  interestRate: 10,
};

const generateBondName = (
  bondDetails: BondDetails,
  maturityDate: number
): string => {
  return `Bond ${bondDetails.daoName} ${maturityDate} ${bondDetails.paymentToken}`;
};

const generateMaturityDate = async (
  provider: Web3Provider,
  bondDetails: BondDetails
): Promise<number> => {
  const block = await provider.getBlock(await provider.getBlockNumber());
  return block.timestamp + Number(bondDetails.maturityDate);
};

export const BorrowForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<BondDetails>({
    defaultValues,
  });
  const watchAmount = watch("amount", 0);
  const watchPaymentToken = watch("paymentToken", PaymentToken.USDC);
  const watchInterestRate = watch("interestRate", 0);

  const bondFactoryAbi = abis.bondFactory;
  const erc20Abi = abis.erc20;

  const createBond = async (bondDetails: BondDetails) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Bonds have a decimal place of 6 so we need to covert. TODO Maybe fetch the decimal place in the future
        const convertedBondAmount =
          bondDetails.amount * 1000000 * (0.01 * bondDetails.interestRate + 1);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const paymentTokenAddress =
          PAYMENT_TOKEN_ADDRESSES[bondDetails.paymentToken];
        const paymentTokenContract = new ethers.Contract(
          paymentTokenAddress,
          erc20Abi,
          signer
        );

        const bondFactoryContract = new ethers.Contract(
          BOND_FACTORY_ADDRESS,
          bondFactoryAbi,
          signer
        );

        // TODO add check to see if allowance is already done
        const allowanceERC20Txn = await paymentTokenContract.approve(
          BOND_FACTORY_ADDRESS,
          bondDetails.amount
        );
        // string memory name,
        //       string memory symbol,
        //       uint256 maturity, (NEEDS TO BE IN BLOCK TIMESTAMP)
        //       address paymentToken, NEEDS TO POINT TO TOKEN ADDRESS
        //       address collateralToken, TO BE REMOVED
        //       uint256 collateralTokenAmount, TO BE REMOVED
        //       uint256 convertibleTokenAmount,
        //       uint256 bonds,
        //       string memory daoName
        //TO ACCEPT INTEREST RATE
        const maturityDate = await generateMaturityDate(provider, bondDetails);
        const bondName = generateBondName(bondDetails, maturityDate);
        const createBondTxn = await bondFactoryContract.createBond(
          bondName,
          bondDetails.symbol,
          maturityDate,
          paymentTokenAddress,
          COLLATERAL_TOKEN_ADDRESS,
          1000000000000,
          0,
          convertedBondAmount,
          bondDetails.daoName,
          {
            // TODO add gas price calulator to get dynamic prices
            gasPrice: ethers.utils.parseUnits("100", "gwei"),
            gasLimit: 500000,
          }
        );

        console.log("Mining...", createBondTxn.hash);
        console.log("Mining...erc", allowanceERC20Txn.hash);
        await allowanceERC20Txn.wait();
        await createBondTxn.wait();

        console.log(
          "Mined -- Success ",
          createBondTxn.hash + "Mined -- Success ERC20",
          allowanceERC20Txn.hash
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit(createBond);

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

      <input className=" p-2 rounded-xl m-2 bg-blue-400" type="submit"></input>
    </form>
  );
};
