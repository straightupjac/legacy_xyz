import React from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Sign from "./Sign";
import { Container } from "@mui/material";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const SignLegacy = ({projectId}) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container>
        <p>Thank you for visiting my corner on the internet. To leave your legacy here, please sign by clicking the button below. By signing, this signature will be part of your legacy on the blockchain. </p>
        <a href="/">Learn more here</a>
        <Sign projectId={projectId} />
      </Container>
    </Web3ReactProvider>
  );
};

export default SignLegacy;
