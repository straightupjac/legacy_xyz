import React from "react";
import styles from "./guestbook.module.css"
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Sign from "./Sign";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const SignLegacy = () => {
  return (
    <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className={styles.guestbookDescription}>
        <p>Thank you for visiting my corner on the internet. To leave your legacy here, please sign by clicking the button below. By signing, this signature will be part of your legacy on the blockchain. </p>
        <a href="/">Learn more here</a>
        <Sign />
      </div>
    </Web3ReactProvider>
    </>
  );
};

export default SignLegacy;
