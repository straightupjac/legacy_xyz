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
| modalStyle | override modal style (dangerously set) | ❌ no  | `modalStyle={ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 445, background: 'white', border: '0px', borderRadius: 10, boxShadow: 24, marginLeft: 'auto', marginRight: 'auto', p: 5}`|

<b>For SignersList</b>
| Prop Name| Description | Required | Example |
|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| projectId          | specify project id for the guestbook | ✅ yes  | `projectId="legacyxyz"` |
| cardStyle | override card style| ❌ no  | `cardStyle={{border: '0px solid #3f8758', p: 4, maxWidth: '800px', borderRadius: 10}}`|

# Next.js Example
To use with Next.js, you will need to dynamically import. This extension requires components to be rendered in the browser (not server side). The Next.js workaround for this is documented [here](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr).
```js
const SignLegacy = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignLegacy),
  { ssr: false }
)

const SignersList = dynamic(() =>
  import('legacy-xyz').then((legacy) => legacy.SignersList),
  { ssr: false }
)
```
## Supported wallets
Current version only supports injected wallet providers - Coinbase Wallet and Metamask. We plan to add support for WalletConnect and more in the future depending on demand.

## Contribute
Our code is all opensource at [legacy_xyz](https://github.com/straightupjac/legacy_xyz). Please file a ticket or open a pull request!