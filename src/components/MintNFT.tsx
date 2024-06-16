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
  const account = useAccount();

  // indexes
  const [indexes, setIndexes] = useState<number[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const { writeContract, isSuccess } = useWriteContract();

  const {
    data: dataBalance,
    refetch: refetchBalance,
    isFetchedAfterMount: isFetchedAfterMountBlance,
  } = useReadContract({
    abi,
    address,
    functionName: "balanceOf",
    args: [account.address],
  });

  const {
    data: dataTokenIds,
    refetch: refetchTokenIds,
    isFetchedAfterMount: isFetchedAfterMountTokenIds,
  } = useReadContracts({
    contracts: indexes.map((i) => {
      return {
        abi,
        address,
        functionName: "tokenOfOwnerByIndex",
        args: [account.address, i],
      };
    }),
  });

  useEffect(() => {
    if (isFetchedAfterMountBlance) {
      const _balance = Number(dataBalance);
      setIndexes(Array.from({ length: _balance }, (_, i) => i));
    }
  }, [dataBalance]);

  useEffect(() => {
    if (isFetchedAfterMountTokenIds) {
      refetchTokenIds();
    }
  }, [indexes]);

  useEffect(() => {
    if (isFetchedAfterMountTokenIds) {
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
              args: [account.address],
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
      <div style={{ marginRight: "20px" }}>
        {tokenIds.length > 0 && (
          <ul>
            {tokenIds.map((tokenId) => (
              <li key={tokenId}>
                <a
                  href={`https://testnets.opensea.io/assets/base-sepolia/${address}/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tokenId #{tokenId} on OpenSea
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
