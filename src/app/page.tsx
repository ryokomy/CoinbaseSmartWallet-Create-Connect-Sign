"use client";

import { useAccount, useDisconnect } from "wagmi";
import { KyuzanWalletButton } from "@/components/KyuzanWalletButton";
import { SignMessage } from "@/components/SignMessage";
import { KomyX } from "@/components/KomyX";
import { ClaimNFT } from "@/components/ClaimNFT";

function App() {
  const account = useAccount();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <KyuzanWalletButton />
      {account.status === "connected" && (
        <>
          <div style={{ marginTop: "40px" }}>
            <SignMessage />
          </div>
          <div style={{ marginTop: "40px" }}>
            <ClaimNFT />
          </div>
        </>
      )}
      <div style={{ marginTop: "40px" }}>
        <KomyX />
      </div>
    </div>
  );
}

export default App;
