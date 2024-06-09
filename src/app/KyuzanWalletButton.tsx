import React, { useCallback } from "react";
import { useConnect, useAccount } from "wagmi";
import styled from "styled-components";
import kyuzanLogo from "../../public/kyuzan-logo.png";
import Image from "next/image";

const StyledButton = styled.button`
  background: #28a745;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px 10px 8px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s,
    box-shadow 0.3s;

  &:hover {
    background-color: #34a853;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &.inactive {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: #cccccc;
      transform: none;
    }
  }
`;

export function KyuzanWalletButton() {
  const { connectors, connect } = useConnect();
  const { status } = useAccount();

  const createOrConnectWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  const isConnected = status === "connected";

  return (
    <StyledButton
      onClick={createOrConnectWallet}
      className={isConnected ? "inactive" : ""}
    >
      <Image
        src={kyuzanLogo}
        alt="Kyuzan Logo"
        width={24}
        height={24}
        style={{ marginRight: "6px" }}
      />
      {isConnected ? "Wallet Connected" : "Create Wallet / Connect Wallet"}
    </StyledButton>
  );
}
