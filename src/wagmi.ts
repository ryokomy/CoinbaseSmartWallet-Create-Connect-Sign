import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Coinbase Smart Wallet Test",
      preference: "smartWalletOnly",
      appLogoUrl:
        "https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8d5cc37f-f422-4bf9-aa9e-759fbefb5be5/alpha-280/w=256,quality=90,fit=scale-down",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
