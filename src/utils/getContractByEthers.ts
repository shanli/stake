// import { Abi, Address, GetContractReturnType, PublicClient, WalletClient, getContract as viemGetContract, } from "viem"
import { defaultChainId } from './wagmi'
// import { viemClients } from "./viem"
import { ethers } from "ethers";
import config  from "../../config";
import { stakeAbiE } from '../assets/abis/stakeE'
export const getSigner = () => {
    const ALCHEMY_SEPOLIA_URL = `https://eth-sepolia.g.alchemy.com/v2/${config.ALCHEMY_ID || ''}`;

    const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

    // 利用私钥和provider创建wallet对象
    const privateKey = config.PK || '';
    const wallet = new ethers.Wallet(privateKey, provider)
    return wallet;
}

export const getProvider = () => {
    const ALCHEMY_SEPOLIA_URL = `https://eth-sepolia.g.alchemy.com/v2/${config.ALCHEMY_ID || ''}`;

    const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);
    return provider;
}


export const getContractE = ({
  abi,
  address,
  chainId = defaultChainId,
  signer,
}) => {
     console.log('contract address=========>', address);
    const c = new ethers.Contract(address, abi, signer);
   
    return c;
}