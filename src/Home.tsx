import { useMiniKit } from "@coinbase/onchainkit/minikit";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  return <div>Your app content goes here</div>;
};

export default Home;
