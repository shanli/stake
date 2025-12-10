import { useMemo } from "react"
import { Abi, Address, WalletClient } from "viem"
import { useChainId, useWalletClient } from "wagmi"
import { getContract } from "../utils/contractHelper"
import { StakeContractAddress } from "../utils/env"
import { stakeAbi } from '../assets/abis/stake'
import { stakeAbiE } from '../assets/abis/stakeE'
import { getSigner, getProvider, getContractE } from "../utils/getContractByEthers"

type UseContractOptions = {
  chainId?: number,
  onlyRead?: boolean
}

export function useContract<TAbi extends Abi>(
  addressOrAddressMap?: Address | { [chainId: number]: Address },
  abi?: TAbi,
  options?: UseContractOptions,
) {
  const currentChainId = useChainId()
  const chainId = options?.chainId || currentChainId
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null
    let address: Address | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      const signer = getSigner();
      const c = getContract({
        abi,
        address,
        chainId,
        signer: walletClient ?? undefined,
      })
      console.log('c===:', c);
     
      return c;
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, abi, chainId, walletClient])
}

export const useStakeContract = () => {
  return useContract(StakeContractAddress, stakeAbi as Abi)
}

export function useContractE<TAbi extends Abi>(
  addressOrAddressMap?: Address | { [chainId: number]: Address },
  abi?: TAbi,
  options?: UseContractOptions,
) {
  const currentChainId = useChainId()
  const chainId = options?.chainId || currentChainId
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!addressOrAddressMap || !abi || !chainId) return null
    let address: Address | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      let signer = getSigner();
      console.log("address====>", address);
      // if (options?.onlyRead) {
      //   signer = getProvider().getSigner(address);
      // }
      // else {
      //   signer = getSigner();
      // }
      const e = getContractE({
        abi,
        address,
        chainId,
        signer
      })
      console.log('e===:', e);
      return e;
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, abi, chainId, walletClient])
}
export const useStakeContractE = () => {
  return useContractE(StakeContractAddress, stakeAbiE as Abi)
}

// export const useStakeContractER = () => {
//   return useContractE(StakeContractAddress, stakeAbiE as Abi, {onlyRead: true})
// }