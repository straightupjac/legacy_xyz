/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import { verify, sign } from "./utils/utils";
const START_SIGN = 0;
const CONNECT_WALLET = 1;
const SIGN_MESSAGE = 2;
const VERIFY = 3;
const VERIFY_TWEET = 4;
const VERIFYING = 5;
const FINISH_SIGN = 6;

const CloseButton = ({
  handleClose
}) => {
  return /*#__PURE__*/React.createElement(IconButton, {
    onClick: handleClose,
    sx: {
      position: 'absolute',
      right: 15,
      top: 15,
      background: 'rgba(196, 196, 196, 0.2)',
      height: 48,
      width: 48,
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement(CloseIcon, null));
};

const StartSign = ({
  name,
  handle,
  alert,
  setName,
  setHandle,
  handleFormSubmit
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Leave your ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy"), "."), /*#__PURE__*/React.createElement(TextField, {
    label: "name",
    variant: "outlined",
    value: name,
    required: true,
    onInput: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "twitter handle",
    variant: "outlined",
    value: handle,
    onInput: e => setHandle(e.target.value)
  }), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert), /*#__PURE__*/React.createElement(Button, {
    onClick: handleFormSubmit,
    variant: "contained",
    size: "large",
    sx: {
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    }
  }, "Connect wallet to sign"));
};

const ConnectWallet = ({
  alert,
  handleConnect
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Connect your ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "wallet"), "."), /*#__PURE__*/React.createElement(Box, {
    onClick: () => handleConnect('coinbase'),
    sx: {
      cursor: 'pointer',
      borderBottom: '1px solid #eee',
      textAlign: 'center',
      py: 2,
      ':hover': {
        opacity: 0.8
      }
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/wallets/coinbase.png",
    style: {
      height: 50,
      width: 300
    },
    alt: "login with Coinbase Wallet!"
  })), /*#__PURE__*/React.createElement(Box, {
    onClick: () => handleConnect('metamask'),
    sx: {
      cursor: 'pointer',
      textAlign: 'center',
      ':hover': {
        opacity: 0.8
      }
    }
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
  }, alert));
};

const SignMessage = ({
  alert,
  handleSign
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Sign a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "message"), " with your wallet."), /*#__PURE__*/React.createElement(Button, {
    onClick: handleSign,
    variant: "contained",
    size: "large",
    sx: {
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    }
  }, "Sign message"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert));
};

const Verify = ({
  alert,
  handleTweet,
  handleWithoutVerifying
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Verify your ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "signature"), "."), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 18
    }
  }, "Tweet a message to prove that you control this address. Return here afterwards to complete verification."), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTweet,
    startIcon: /*#__PURE__*/React.createElement(TwitterIcon, null),
    variant: "contained",
    sx: {
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    }
  }, "Post Proof"), alert && /*#__PURE__*/React.createElement(Typography, {
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
  }, "Continue without verifying")));
};

const Verifying = () => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Verifying"), /*#__PURE__*/React.createElement(CircularProgress, {
    size: "large"
  }));
};

const VerifyTweet = ({
  alert,
  handleTwitterVerifyAndSign
}) => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, "Complete ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "verification"), "."), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 18
    }
  }, "After sending your tweet, click the button below to complete verification:"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleTwitterVerifyAndSign,
    startIcon: /*#__PURE__*/React.createElement(TwitterIcon, null),
    variant: "contained",
    sx: {
      background: '#000000',
      textTransform: 'none',
      fontSize: 20,
      borderRadius: 3,
      ':hover': {
        background: '#000000',
        opacity: 0.8
      }
    }
  }, "Verify Tweet"), alert && /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 10,
      color: 'red',
      textAlign: 'center'
    }
  }, alert));
};

const FinishSign = () => {
  return /*#__PURE__*/React.createElement(Stack, {
    spacing: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 36,
      fontWeight: 'bold'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "YOU"), " did it!"), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 20
    }
  }, "Thanks for signing and building your ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy"), "."));
};

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
    if (name) {
      setAlert('');
      setState(CONNECT_WALLET);
    } else {
      setAlert('Name is required.');
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
  }, /*#__PURE__*/React.createElement(CloseButton, {
    handleClose: handleClose
  }), /*#__PURE__*/React.createElement(Stack, {
    sx: {
      pt: 2
    }
  }, state === START_SIGN && /*#__PURE__*/React.createElement(StartSign, {
    name: name,
    handle: handle,
    alert: alert,
    setName: setName,
    setHandle: setHandle,
    handleFormSubmit: handleFormSubmit
  }), state === CONNECT_WALLET && /*#__PURE__*/React.createElement(ConnectWallet, {
    alert: alert,
    handleConnect: handleConnect
  }), state === SIGN_MESSAGE && /*#__PURE__*/React.createElement(SignMessage, {
    alert: alert,
    handleSign: handleSign
  }), state === VERIFY && /*#__PURE__*/React.createElement(Verify, {
    alert: alert,
    handleTweet: handleTweet,
    handleWithoutVerifying: handleWithoutVerifying
  }), state === VERIFY_TWEET && /*#__PURE__*/React.createElement(VerifyTweet, {
    alert: alert,
    handleTwitterVerifyAndSign: handleTwitterVerifyAndSign
  }), state === VERIFYING && /*#__PURE__*/React.createElement(Verifying, null), state === FINISH_SIGN && /*#__PURE__*/React.createElement(FinishSign, null), /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 12,
      textAlign: 'center',
      mt: 3
    }
  }, "\uD83C\uDF31 Check out ", /*#__PURE__*/React.createElement("a", {
    href: "https://legacy-xyz.vercel.app/",
    target: "_blank",
    style: {
      textDecoration: 'none'
    },
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#257C5E'
    }
  }, "legacy")), " to learn more")))));
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 445,
  bgcolor: 'white',
  border: '0px',
  borderRadius: 10,
  boxShadow: 24,
  marginLeft: 'auto',
  marginRight: 'auto',
  p: 5
};