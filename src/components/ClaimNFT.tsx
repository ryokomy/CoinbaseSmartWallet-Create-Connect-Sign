import { useCallback, useEffect, useMemo, useState } from "react";
import type { Hex } from "viem";
import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import StyledButton from "../styles/StyledButton";
import kyuzanLogo from "../../public/kyuzan-logo.png";
import Image from "next/image";

export function ClaimNFT() {
  return (
    <div>
      <StyledButton
        onClick={async () => {
          return true;
        }}
      >
        <Image
          src={kyuzanLogo}
          alt="Kyuzan Logo"
          width={24}
          height={24}
          style={{ marginRight: "6px" }}
        />
        3. Claim NFT
      </StyledButton>
    </div>
  );
}
