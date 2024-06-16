"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { KyuzanWalletButton } from "@/components/KyuzanWalletButton";
import { SignMessage } from "@/components/SignMessage";
import { KomyX } from "@/components/KomyX";
import { MintNFT } from "@/components/MintNFT";

function App() {
  const account = useAccount();
  const [showSignMessage, setShowSignMessage] = useState(false);

  const toggleSignMessage = () => {
    setShowSignMessage((prev) => !prev);
  };

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
            <MintNFT />
          </div>
          <div style={{ marginTop: "40px" }}>
            <button onClick={toggleSignMessage}>
              {showSignMessage
                ? "(optional) Hide Sign Message"
                : "(optional) Show Sign Message"}
            </button>
          </div>
          {showSignMessage && (
            <div style={{ marginTop: "10px" }}>
              <SignMessage />
            </div>
          )}
        </>
      )}
      <div style={{ marginTop: "40px" }}>
        <KomyX />
      </div>
    </div>
  );
}

export default App;
