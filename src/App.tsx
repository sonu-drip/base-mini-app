import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import "./App.css";
import Home from "./Home";

const queryClient = new QueryClient();
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [],
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <MiniKitProvider
          // @ts-expect-error -- process.env types
          apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY || ""}
          chain={base}
          enabled
        >
          <Home />
        </MiniKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
