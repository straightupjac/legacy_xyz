import React, { useState } from "react";
import styles from "./guestbook.module.css"
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import SignModal from "./SignModal";

const Sign = () => {
  const { activate, deactivate, chainId, active, account, library } = useWeb3React();

  // for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClose = () => setIsModalVisible(false);
  const handleConnect = () => {
    setIsModalVisible(true);
  };

  const injected = new InjectedConnector();
  const walletlink = new WalletLinkConnector({
  appName: 'legacy_xyz',
})

  function abridgeAddress(hex, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  const handleLoginClick = async (type) => {
    if (type === 'coinbase') {
      await activate(walletlink);
    } else if (type === 'metamask') {
      await activate(injected);
    }
  }

  const useENSName = (library, address) => {
    const [ENSName, setENSName] = useState("");
    useEffect(() => {
      if (library && typeof address === "string") {
        let stale = false;

        library
          .lookupAddress(address)
          .then((name) => {
            if (!stale && typeof name === "string") {
              setENSName(name);
            }
          })
          .catch(() => {});

        return () => {
          stale = true;
          setENSName("");
        };
      }
    }, [library, address]);

    return ENSName;
  }

  return (
    <>
      <button className={styles.signButton} onClick={handleConnect}>
        Sign here
      </button>
      <SignModal
        isModalVisible={isModalVisible}
        handleLoginClick={handleLoginClick}
        handleClose={handleClose}
      />
    </>
  )
}

export default Sign;
