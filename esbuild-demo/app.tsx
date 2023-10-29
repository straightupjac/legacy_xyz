
import * as React from 'react'
import ReactDOM from 'react-dom'
import { SignLegacy, SignersList } from 'legacy-xyz'

function App() {

  return (<div><h1>hello world</h1>
    <SignLegacy projectId='legacyxyz' />
    <br />
    <SignersList projectId='legacyxyz' />
  </div>)
}

ReactDOM.render(<App />, document.querySelector("#root"))