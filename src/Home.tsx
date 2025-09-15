import { useMiniKit } from "@coinbase/onchainkit/minikit";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

const User = () => {
  const { isConnected, address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { connect, connectors } = useConnect({
    mutation: {
      onSuccess: () => {
        setLoading(false);
      },
    },
  });
  useEffect(() => {
    if (isConnected) setLoading(false);
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, [connect, connectors, isConnected]);

  if (isConnected) {
    return <div>Connected as {address}</div>;
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready || loading}
          key={connector.id}
          onClick={() => {
            setLoading(true);
            connect({ connector });
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {loading && "..."}
        </button>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  return <User />;
};

export default Home;
