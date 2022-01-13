import React, { useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import SignModal from "./SignModal";
import { generateSignature } from "./utils/utils";
import { Button } from "@mui/material";

const signMessage = (account, name, twitterHandle) => {
  if (name && twitterHandle) {
    return `${name} was here. By signing, you are leaving your legacy on this corner of the internet. \n
      account: ${account}\n
      twitter: ${twitterHandle}
    `
  } else {
    return `${name} was here. By signing, you are leaving your legacy on this corner of the internet. \n
    account: ${account}
    `
  }
}

const Sign = ({projectId, buttonLabel, buttonStyle}) => {
  const { activate, active, account } = useWeb3React();

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
      <Button
        variant="contained" size="large"
        sx={
          buttonStyle ? buttonStyle :
          {maxWidth: '200px', background: '#000000', textTransform: 'none', fontSize: 20, borderRadius: 3, ':hover': { background: '#000000', opacity: 0.8 }}
        }
        onClick={handleConnect}
      >
        {buttonLabel || `Sign here`}
      </Button>
      <SignModal
        projectId={projectId}
        account={account}
        active={active}
        buttonStyle={buttonStyle}
        isModalVisible={isModalVisible}
        handleLoginClick={handleLoginClick}
        handleClose={handleClose}
        signFromWallet={signFromWallet}
      />
    </>
  )
}

export default Sign;
