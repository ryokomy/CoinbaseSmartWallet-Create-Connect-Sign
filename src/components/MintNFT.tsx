import {
  useAccount,
  useWriteContract,
  useReadContract,
  useReadContracts,
} from "wagmi";
import StyledButton from "../styles/StyledButton";
import kyuzanLogo from "../../public/kyuzan-logo.png";
import Image from "next/image";
import { abi, address } from "@/contracts/mintable-erc721";
import { useState, useEffect } from "react";

export function MintNFT() {
  const { address: userAddress, isConnected } = useAccount();

  // indexes
  const [indexes, setIndexes] = useState<number[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const { writeContract } = useWriteContract();

  const {
    data: dataBalance,
    refetch: refetchBalance,
    isFetched: isFetchedBalance,
  } = useReadContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [userAddress],
  });

  const {
    data: dataTokenIds,
    refetch: refetchTokenIds,
    isFetched: isFetchedTokenIds,
  } = useReadContracts({
    contracts: indexes.map((i) => {
      return {
        abi,
        address,
        functionName: "tokenOfOwnerByIndex",
        args: [userAddress, i],
      };
    }),
  });

  useEffect(() => {
    if (isFetchedBalance) {
      console.log("dataBalance");
      console.log(dataBalance);
      const _balance = Number(dataBalance);
      setIndexes(Array.from({ length: _balance }, (_, i) => i));
    }
  }, [dataBalance, isConnected]);

  useEffect(() => {
    if (isFetchedTokenIds) {
      refetchTokenIds();
    }
  }, [indexes, refetchTokenIds]);

  useEffect(() => {
    if (isFetchedTokenIds) {
      setTokenIds(
        (dataTokenIds as unknown[]).map((dataTokenId) =>
          Number((dataTokenId as { result: bigint }).result)
        )
      );
    }
  }, [dataTokenIds]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StyledButton
        onClick={() => {
          writeContract(
            {
              abi,
              address,
              functionName: "safeMint",
              args: [userAddress],
            },
            {
              onSuccess: async () => {
                refetchBalance();
              },
            }
          );
        }}
      >
        <Image
          src={kyuzanLogo}
          alt="Kyuzan Logo"
          width={24}
          height={24}
          style={{ marginRight: "6px" }}
        />
        2. Mint NFT
      </StyledButton>
      <div style={{ marginRight: "30px" }}>
        {tokenIds.length > 0 && (
          <ul>
            {tokenIds.map((tokenId) => (
              <li key={tokenId}>
                <a
                  href={`https://testnets.opensea.io/assets/base-sepolia/${address}/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Your NFT (tokenId #{tokenId}) on OpenSea
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
