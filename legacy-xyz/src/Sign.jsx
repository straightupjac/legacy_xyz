import React, { useState } from "react";
import styles from "./guestbook.module.css"
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import SignModal from "./SignModal";
import { generateSignature } from "./utils/utils";

const signMessage = (account, name, twitterHandle) => {
   return `${name} was here. By signing, you are leaving your legacy on this corner of the internet. \n
   account: ${account}\n
   twitter: ${twitterHandle}
   `
}

const Sign = ({projectId}) => {
  const { activate, account } = useWeb3React();

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

  const handleLoginClick = async (type) => {
    if (type === 'coinbase') {
      await activate(walletlink);
    } else if (type === 'metamask') {
      await activate(injected);
    }
  }

  const signFromWallet = async (account, name, twitterHandle) => {
    return await generateSignature(signMessage(account, name, twitterHandle))
  };

  return (
    <>
      <button className={styles.signButton} onClick={handleConnect}>
        Sign here
      </button>
      <SignModal
        projectId={projectId}
        account={account}
        isModalVisible={isModalVisible}
        handleLoginClick={handleLoginClick}
        handleClose={handleClose}
        signFromWallet={signFromWallet}
      />
    </>
  )
}

export default Sign;
