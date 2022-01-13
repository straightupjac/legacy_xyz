import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components'; // TODO: replace with emotion

import Stack from '@mui/material/Stack';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { verify, sign } from "./utils/utils";
const START_SIGN = 0;
const CONNECT_WALLET = 1;
const SIGN_MESSAGE = 2;
const VERIFY = 3;
const VERIFY_TWEET = 4;
const VERIFYING = 5;
const FINISH_SIGN = 6;
export default function SignModal(props) {
  const {
    projectId,
    isModalVisible,
    handleClose,
    handleLoginClick,
    signFromWallet,
    account
  } = props;
  const [state, setState] = useState(START_SIGN);
  const [name, setName] = useState();
  const [handle, setHandle] = useState();
  const [alert, setAlert] = useState();
  const [signature, setSignature] = useState(false);

  const handleFormSubmit = () => {
    if (name && handle) {
      setAlert('');
      setState(CONNECT_WALLET);
    } else {
      setAlert('Name and Twitter handle are required.');
    }
  }; // connects to wallet


  const handleConnect = provider => {
    handleLoginClick(provider).then(() => {
      setAlert('');
      setState(SIGN_MESSAGE);
    }).catch(err => {
      setAlert('An error occured. Please try connecting your wallet again.');
    });
  };

  const handleSign = async () => {
    signFromWallet(account, name, handle).then(sig => {
      setSignature(sig);
      setAlert('');
      setState(VERIFY);
    }).catch(err => {
      setAlert('An error occurred. Please try signing again.');
    });
  };

  const generateTweet = () => {
    const str = `I am verifying for @legacy_xyz. signature:${signature}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
  };

  const handleTweet = () => {
    generateTweet();
    setState(VERIFY_TWEET);
  };

  const handleTwitterVerifyAndSign = () => {
    setState(VERIFYING);
    verify(signature, handle).then(() => {
      // verifying that they signed
      sign(projectId, name, account, handle, signature).then(result => {
        setAlert('');
        setState(FINISH_SIGN);
      }).catch(err => {
        setAlert("An error occurred with signing to the blockchain.");
        setState(VERIFY_TWEET);
      });
    }).catch(err => {
      setAlert("An error occurred. Did you tweet a message?");
      setState(VERIFY);
    });
  };

  const handleWithoutVerifying = () => {
    setState(VERIFYING);
    sign(projectId, name, account, handle, signature).then(result => {
      setAlert('');
      setState(FINISH_SIGN);
    }).catch(err => {
      setAlert("An error occurred with signing to the blockchain.");
      setState(VERIFY);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    open: isModalVisible,
    onClose: handleClose,
    onBackdropClick: handleClose
  }, /*#__PURE__*/React.createElement(Box, {
    sx: style
  }, state === START_SIGN && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Leave your legacy"), /*#__PURE__*/React.createElement(TextField, {
    label: "name",
    variant: "outlined",
    value: name,
    required: true,
    onInput: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "twitter handle",
    variant: "outlined",
    value: handle,
    required: true,
    onInput: e => setHandle(e.target.value)
  }), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement(Button, {
    onClick: handleFormSubmit
  }, "Connect wallet to sign")), state === CONNECT_WALLET && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Connect Wallet"), /*#__PURE__*/React.createElement(Coinbase, {
    onClick: () => handleConnect('coinbase')
  }, /*#__PURE__*/React.createElement("img", {
    src: "/wallets/coinbase.png",
    style: {
      height: 50,
      width: 300
    },
    alt: "login with Coinbase Wallet!"
  })), /*#__PURE__*/React.createElement(Metamask, {
    onClick: () => handleConnect('metamask')
  }, /*#__PURE__*/React.createElement("img", {
    src: "/wallets/metamask.svg",
    style: {
      height: 100,
      width: 300
    },
    alt: "login with Metamask!"
  })), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert)), state === SIGN_MESSAGE && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Sign a message from your wallet"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSign
  }, "Sign"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert)), state === VERIFY && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Verify your signature"), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    }
  }, "Tweet a message to prove that you control this address. Return here afterwards to complete verification."), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTweet
  }, "Verify Twitter Handle"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    },
    onClick: handleWithoutVerifying
  }, "Continue without verifying"))), state === VERIFY_TWEET && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    }
  }, "After sending your tweet, click the button below to complete verification:"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTwitterVerifyAndSign
  }, "Verify Tweet"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    },
    onClick: handleWithoutVerifying
  }, "Continue without verifying"))), state === VERIFYING && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Verifying"), /*#__PURE__*/React.createElement(CircularProgress, {
    size: "large"
  })), state === FINISH_SIGN && /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20,
      textAlign: 'center'
    }
  }, "Done"), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center'
    }
  }, "Thanks for signing and leaving your legacy. See you soon :)")))));
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'white',
  border: '0px',
  boxShadow: 24,
  marginLeft: 'auto',
  marginRight: 'auto',
  p: 4
};
export const Coinbase = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  :hover {
    opacity:0.8;
  }
`;
export const Metamask = styled.div`
  cursor: pointer;

  :hover {
    opacity:0.8;
  }
`;