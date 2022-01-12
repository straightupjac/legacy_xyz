
import * as React from 'react'
import ReactDOM from 'react-dom'
import { SignLegacy } from 'legacy_xyz'
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {

  return (<div><h1>hello world</h1>
    <Web3ReactProvider getLibrary={getLibrary}>
      <SignLegacy projectId='legacyxyz' />
    </Web3ReactProvider>
  </div>)
}

ReactDOM.render(<App />, document.querySelector("#root"))