"use client";

import { useAccount, useDisconnect } from "wagmi";
import { KyuzanWalletButton } from "./KyuzanWalletButton";
import { SignMessage } from "./SignMessage";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();

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
        <div style={{ marginTop: "40px" }}>
          <SignMessage />
        </div>
      )}
    </div>
  );
}

export default App;
