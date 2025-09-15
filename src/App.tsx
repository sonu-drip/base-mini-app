import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { base } from "wagmi/chains";
import "./App.css";
import Home from "./Home";

function App() {
  return (
    <MiniKitProvider
      // @ts-expect-error -- process.env types
      apiKey={process.env.VITE_PUBLIC_ONCHAINKIT_API_KEY || ""}
      chain={base}
    >
      <Home />
    </MiniKitProvider>
  );
}

export default App;
