import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import { BOND_FACTORY_ADDRESS } from "@src/constants/addresses";
import { getWeb3 } from "@src/ethereum/web3";
import { BondDetails } from "@src/components/forms/common";
import abi from "@src/abis";

export const createBond = async (bondDetails: BondDetails) => {
  const web3 = getWeb3();
  // TODO will revisit Contract type after converting to a mono-repo and using typechain to get the type
  const bondFactory: Contract = new web3.eth.Contract(
    abi.bondFactory as AbiItem[],
    BOND_FACTORY_ADDRESS
  );

  await bondFactory.methods
    .createBond(
      bondDetails.daoName,
      "BS",
      bondDetails.maturityDate,
      bondDetails.paymentToken,
      "OxCollateralTokenAddr",
      1,
      1,
      bondDetails.amount
    ).estimateGas({ });
};
