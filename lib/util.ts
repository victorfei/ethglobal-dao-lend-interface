import supportedChains from "./chains";
import { IChainData } from "./types";

export function getChainData(chainId?: number): IChainData {
  if (!chainId) {
    return {
      name: "default",
      short_name: "default",
      chain: "default",
      network: "default",
      chain_id: 1,
      network_id: 1,
      rpc_url: "DEFAULT",
      native_currency: {
        symbol: "USDC",
        name: "DEFAULT",
        decimals: "100000000000000000",
        contractAddress: "0x",
      },
    };
  }
  const chainData = supportedChains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "1d11cd9ae23f484a99bd137c573c8fe5";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
