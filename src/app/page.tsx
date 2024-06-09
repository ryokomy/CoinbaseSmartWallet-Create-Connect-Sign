"use client";

import { useAccount, useDisconnect } from "wagmi";
import { KyuzanWalletButton } from "./KyuzanWalletButton";

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
        <>
          <div style={{ marginTop: "20px" }}> {account.addresses[0]}</div>
          <button
            type="button"
            onClick={() => disconnect()}
            style={{ marginTop: "20px" }}
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}

export default App;
