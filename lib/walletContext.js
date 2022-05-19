import { createContext, useContext, useEffect, useState } from "react";
import { web3Modal } from "./useWeb3Modal";

export const WalletAuthContext = createContext();

export const useWalletAuth = () => {
  return useContext(WalletAuthContext);
};

export const WalletAuthProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [injectedProvider, setInjectedProvider] = useState();
  const [loading, setLoading] = useState(true);

  const checkIfWalletIsConnected = async () => {
    // TODO: consider remove below and check for wallet connection by query
    // |injectedProvider|, probably can do something like 
    // |injectedProvider.connected?|.

    // try {
    //   const { ethereum } = window;

    //   if (!ethereum) {
    //     console.log("No wallet detected");
    //     return;
    //   } else {
    //     console.log("We have the ethereum object", ethereum);
    //   }

    //   /*
    //    * Check if we're authorized to access the user's wallet
    //    */
    //   const accounts = await ethereum.request({ method: "eth_accounts" });

    //   if (accounts.length !== 0) {
    //     const account = accounts[0];
    //     setCurrentAccount(account);
    //   } else {
    //     console.log("No authorized account found");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    setInjectedProvider(web3Provider);

    const signer = web3Provider.getSigner();
    setCurrentAccount(await signer.getAddress());

    // TODO: consider remove below.
    // try {
    //   const { ethereum } = window;

    //   if (!ethereum) {
    //     alert("Get MetaMask!");
    //     return;
    //   }
    //   const accounts = await ethereum.request({
    //     method: "eth_requestAccounts",
    //   });

    //   console.log("Connected", accounts[0]);
    //   setCurrentAccount(accounts[0]);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const value = {
    injectedProvider,
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };

  return (
    <WalletAuthContext.Provider value={value}>
      {children}
    </WalletAuthContext.Provider>
  );
};
