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
        <SignLegacy projectId="legacyxyz"
          // override style examples
          buttonLabel={"Sign"}
          message={" "}
          buttonStyle={
            {
              border: "4px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              height: "60px",
              backgroundColor: "#3f8758",
              textTransform: 'none',
              fontSize: 20,
              ':hover': { background: '#3f8758', opacity: 0.8 }
            }
          }
          cardStyle={{border: '0px solid #3f8758', p: 4, maxWidth: '500px', borderRadius: 10}}
          showLegacy={false}
        />
        <br />
        <SignersList projectId="legacyxyz" />
      </main>

    </div>
  );
}

export default App;
