import { useIsInMiniApp, useMiniKit } from "@coinbase/onchainkit/minikit";
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
      const connector = connectors[0];
      if (connector.ready) {
        connect({ connector });
      }
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
  const { isInMiniApp } = useIsInMiniApp();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  return isInMiniApp ? (
    <User />
  ) : (
    <div>This demo is only available in the Mini App.</div>
  );
};

export default Home;
