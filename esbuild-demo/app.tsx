
import * as React from 'react'
import ReactDOM from 'react-dom'

import { SignLegacy } from 'legacy_xyz'

function App() {
  return (<div><h1>hello world</h1>
    <SignLegacy projectId='legacyxyz' />
  </div>)
}

ReactDOM.render(<App />, document.querySelector("#root"))