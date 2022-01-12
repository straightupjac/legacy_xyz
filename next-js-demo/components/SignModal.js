/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { verify, sign } from "utils/utils";

const START_SIGN = 0;
const CONNECT_WALLET = 1;
const SIGN_MESSAGE = 2;
const VERIFY = 3;
const VERIFY_TWEET = 4;
const VERIFYING = 5;
const FINISH_SIGN = 6;

export default function SignModal(props) {
  const { projectId, isModalVisible, handleClose, handleLoginClick, signFromWallet, account } = props;
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
  };

  // connects to wallet
  const handleConnect = (provider) => {
    handleLoginClick(provider).then(() => {
      setAlert('');
      setState(SIGN_MESSAGE);
    }).catch((err) => {
      setAlert('An error occured. Please try connecting your wallet again.');
    })
  }

  const handleSign = async () => {
    signFromWallet(account, name, handle).then((sig) => {
      setSignature(sig);
      setAlert('');
      setState(VERIFY);
    }).catch((err) => {
      setAlert('An error occurred. Please try signing again.');
    });
  }

  const generateTweet = () => {
    const str = `I am verifying for @legacy_xyz. signature:${signature}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
  }

  const handleTweet = () => {
    generateTweet();
    setState(VERIFY_TWEET);
  }

  const handleTwitterVerifyAndSign = () => {
    setState(VERIFYING);
    verify(signature, handle).then(() => { // verifying that they signed
      sign(projectId, name, account, handle, signature).then((result) => {
        setAlert('');
        setState(FINISH_SIGN);
      }).catch((err) => {
        setAlert("An error occurred with signing to the blockchain.");
        setState(VERIFY_TWEET);
      })
    }).catch((err) => {
      setAlert("An error occurred. Did you tweet a message?");
      setState(VERIFY);
    })
  }

  const handleWithoutVerifying = () => {
    setState(VERIFYING);
    sign(projectId, name, account, handle, signature).then((result) => {
      setAlert('');
      setState(FINISH_SIGN);
    }).catch((err) => {
      setAlert("An error occurred with signing to the blockchain.");
      setState(VERIFY);
    });
  }

  return (
    <>
      <Modal
        open={isModalVisible}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <Box sx={style}>
        {state === START_SIGN &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Leave your legacy</Typography>
            <TextField
              label="name"
              variant="outlined"
              value={name}
              required
              onInput={ e=>setName(e.target.value)}
            />
            <TextField
              label="twitter handle"
              variant="outlined"
              value={handle}
              required
              onInput={ e=>setHandle(e.target.value)}
            />
            {alert && <Typography sx={{fontSize: 10, color: 'red', textAlign: 'center'}}>
              {alert}
              </Typography>}
          <Button onClick={handleFormSubmit}>Connect wallet to sign</Button>
        </Stack>}
        {state === CONNECT_WALLET &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Connect Wallet</Typography>
          <Coinbase onClick={() => handleConnect('coinbase')}>
            <img
              src='/wallets/coinbase.png'
              style={{height:50, width: 300}}
              alt="login with Coinbase Wallet!"
            />
          </Coinbase>
          <Metamask onClick={() => handleConnect('metamask')}>
            <img
              src='/wallets/metamask.svg'
              style={{height:100, width: 300}}
              alt="login with Metamask!"
            />
          </Metamask>
          {alert && <Typography sx={{fontSize: 10, color: 'red', textAlign: 'center'}}>
            {alert}
          </Typography>}
        </Stack>}
        {state === SIGN_MESSAGE &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Sign a message from your wallet</Typography>
          <Button onClick={handleSign}>
            Sign
          </Button>
          {alert && <Typography sx={{fontSize: 10, color: 'red', textAlign: 'center'}}>
            {alert}
          </Typography>}
        </Stack>}
        {state === VERIFY &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Verify your signature</Typography>
          <Typography sx={{fontSize: 12, textAlign: 'center'}}>Tweet a message to prove that you control this address. Return here afterwards to complete verification.</Typography>
          <Button onClick={handleTweet}>Verify Twitter Handle</Button>
          {alert && <Typography sx={{fontSize: 10, color: 'red', textAlign: 'center'}}>
            {alert}
          </Typography>}
          <a>
            <Typography sx={{fontSize: 12, textAlign: 'center'}} onClick={handleWithoutVerifying}>
              Continue without verifying
            </Typography>
          </a>
        </Stack> }
        {state === VERIFY_TWEET && <Stack spacing={2}>
          <Typography sx={{fontSize: 12, textAlign: 'center'}}>After sending your tweet, click the button below to complete verification:</Typography>
          <Button onClick={handleTwitterVerifyAndSign}>Verify Tweet</Button>
          {alert && <Typography sx={{fontSize: 10, color: 'red', textAlign: 'center'}}>
            {alert}
          </Typography>}
          <a>
            <Typography sx={{fontSize: 12, textAlign: 'center'}} onClick={handleWithoutVerifying}>
              Continue without verifying
            </Typography>
          </a>
        </Stack> }
        {state === VERIFYING &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Verifying</Typography>
          <CircularProgress size="large" />
        </Stack> }
        {state === FINISH_SIGN &&
        <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Done</Typography>
          <Typography sx={{fontSize: 12, textAlign: 'center'}}>Thanks for signing and leaving your legacy. See you soon :)</Typography>
        </Stack>}
        </Box>
      </Modal>
    </>
  )
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
  p: 4,
};

export const Coinbase = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  :hover {
    opacity:0.8;
  }
`

export const Metamask = styled.div`
  cursor: pointer;

  :hover {
    opacity:0.8;
  }
`
