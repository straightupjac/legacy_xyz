# legacy-xyz 🌱
Leave your digital legacy. An guestbook plug-in to allow your digital guests to leave their legacy by signing a message with their web3 wallet. Curate your digital legacy with legacy-xyz.

## Usage
```js
import { SignLegacy, SignersList } from 'legacy-xyz';

function App() {
  return (
    <SignLegacy projectId="legacyxyz" />
    <SignersList projectId="legacyxyz" />
  )
}
```

## Props
<b>For SignLegacy</b>
| Prop Name| Description | Required | Example |
|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| projectId          | specify project id for the guestbook | ✅ yes  | `projectId="legacyxyz"` |
| cardStyle | override card style| ❌ no  | `cardStyle={{border: '0px solid #3f8758', p: 4, maxWidth: '800px', borderRadius: 10}}`|
| buttonStyle | override button style | ❌ no  | `buttonStyle={{border: "4px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", height: "60px", backgroundColor: "#3f8758", textTransform: 'none', fontSize: 20, ':hover': { background: '#3f8758', opacity: 0.8 } }}`|
| buttonLabel | override sign button label| ❌ no  | `buttonLabel={"Sign here"}`|
| showLegacy | show learn more text | ❌ no  | `showLegacy={true}`|
| message | override sign info text | ❌ no  | `message={"Click here to sign."}`|

<b>For SignersList</b>
| Prop Name| Description | Required | Example |
|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| projectId          | specify project id for the guestbook | ✅ yes  | `projectId="legacyxyz"` |
| cardStyle | override card style| ❌ no  | `cardStyle={{border: '0px solid #3f8758', p: 4, maxWidth: '800px', borderRadius: 10}}`|

## Supported wallets
Current version only supports injected wallet providers - Coinbase Wallet and Metamask. We plan to add support for WalletConnect and more in the future depending on demand.

## Contribute
Our code is all opensource at [legacy_xyz](https://github.com/straightupjac/legacy_xyz). Please file a ticket or open a pull request!