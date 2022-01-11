import logo from './logo.svg';
import './App.css';
import { SignButton } from 'web3-guestbook';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <SignButton label="Leave your legacy" />
      </header>
    </div>
  );
}

export default App;
