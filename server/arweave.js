require('dotenv').config()
const Arweave = require('arweave')
const fetch = require('node-fetch')

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
})

const CONTROLLER_ADDR = process.env.ARWEAVE_ADDRESS;
const KEY = JSON.parse(process.env.ARWEAVE_KEY);
const DOC_TYPE = "web3_guestbook_doc_type"
const PROJECT_ID = "web3_guestbook_project_id"
const SIG_NAME = "web3_guestbook_name"
const SIG_TWITTER_HANDLE = "web3_guestbook_twitter_handle"
const SIG_ADDR = "web3_guestbook_address"
const SIG_MESSAGE = "web3_guestbook_message"
const SIG_ISVERIFIED = "web3_guestbook_is_verified"
const SIG_SIG = "web3_guestbook_signature"
const VERIFICATION_HANDLE = "web3_guestbook_verif_handle"
const VERIFICATION_SIG = "web3_guestbook_verif_sig"

async function checkIfVerifiedAr(handle, address) {
  const req = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query {
        transactions(
          tags: [
            {
              name: "${DOC_TYPE}",
              values: ["verification"]
            }
          ],
          owners: ["${CONTROLLER_ADDR}"]
        ) {
          edges {
            node {
              id
              owner {
                address
              }
              tags {
                name
                value
              }
            }
          }
        }
      }
      `
    })
  })

  const json = await req.json()
  for (const edge of json.data.transactions.edges) {
    const n = edge.node
    if (n.owner.address === ADMIN_ADDR) {
      const parsedHandle = n.tags.find(tag => tag.name === VERIFICATION_HANDLE).value
      const parsedAddress = n.tags.find(tag => tag.name === VERIFICATION_SIG).value
      if (handle === parsedHandle && address === parsedAddress) {
        return n.id
      }
    }
  }
  return false
}

async function storeVerificationAr(handle, address) {
  let transaction = await arweave.createTransaction({
    data: handle
  }, KEY)
  transaction.addTag(DOC_TYPE, 'verification')
  transaction.addTag(VERIFICATION_HANDLE, handle)
  transaction.addTag(VERIFICATION_ADDR, address)
  await arweave.transactions.sign(transaction, KEY)
  return {
    ...await arweave.transactions.post(transaction),
    id: transaction.id,
  }
}

async function signDocumentAr(projectId, address, name, handle, message, signature, isVerified) {
  let transaction = await arweave.createTransaction({ data: address }, KEY)
  transaction.addTag(DOC_TYPE, 'signature')
  transaction.addTag(PROJECT_ID, projectId)
  transaction.addTag(SIG_NAME, name)
  transaction.addTag(SIG_TWITTER_HANDLE, handle)
  transaction.addTag(SIG_ADDR, address)
  transaction.addTag(SIG_MESSAGE, message)
  transaction.addTag(SIG_SIG, signature)
  transaction.addTag(SIG_ISVERIFIED, isVerified)
  await arweave.transactions.sign(transaction, KEY)
  return await arweave.transactions.post(transaction)
}

module.exports = {
  checkIfVerifiedAr,
  storeVerificationAr,
  signDocumentAr,
}
