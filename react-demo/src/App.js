import logo from './logo.svg';
import './App.css';
import { SignLegacy, SignersList } from 'legacy-xyz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <main className="App-main">
        <SignLegacy projectId="legacyxyz" />
        <br />
        <SignersList projectId="legacyxyz" />
      </main>

    </div>
  );
}

export default App;
