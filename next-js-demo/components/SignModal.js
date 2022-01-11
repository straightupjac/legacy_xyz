/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';

const START_SIGN = 0;
const CONNECT_WALLET = 1;
const VERIFY = 2;
const VERIFYING = 3;
const FINISH_SIGN = 4;

export default function SignModal(props) {
  const { isModalVisible, handleClose, handleLoginClick } = props;
  const [state, setState] = useState(START_SIGN);

  const handleConnect = (provider) => {
    handleLoginClick(provider);
    setState(VERIFY);
  }

  // TODO: populate with actual verify twitter
  const verifyTwitter = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 4000)
    })
  }

  const handleTwitterVerifyAndSign = async () => {
    setState(VERIFYING);
    await verifyTwitter();
    setState(FINISH_SIGN);
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
          <TextField id="outlined-basic" label="name" variant="outlined" />
          <TextField id="outlined-basic" label="Twitter handle (optional)" variant="outlined" />
          <Button onClick={() => setState(CONNECT_WALLET)}>Connect wallet to sign</Button>
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
        </Stack>}
        {state === VERIFY && <Stack spacing={2}>
          <Typography sx={{fontSize: 20, textAlign: 'center'}}>Verify your signature</Typography>
          <Typography sx={{fontSize: 12, textAlign: 'center'}}>Tweet a message to prove that you control this address. Return here afterwards to complete verification.</Typography>
          <Button onClick={handleTwitterVerifyAndSign}>Verify Twitter</Button>
          <a>
            <Typography sx={{fontSize: 12, textAlign: 'center'}} onClick={() => setState(FINISH_SIGN)}>
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
        </Stack> }
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
