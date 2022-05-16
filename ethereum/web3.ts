import { RPC_ADDRESS } from '@src/constants/addresses';
import Web3 from 'web3';

export const getWeb3 = (): Web3 => {
    return new Web3(RPC_ADDRESS);
}