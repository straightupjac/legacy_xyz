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
const DOC_TYPE = "legacy_xyz_doc_type"
/* document types are
- project
- signature
- verification
*/

const PROJECT_ID = "legacy_xyz_project_id"
const PROJECT_NAME = "legacy_xyz_project_name"
const PROJECT_TWITTER = "legacy_xyz_project_twitter"
const PROJECT_WEBSITE = "legacy_xyz_project_website"
const PROJECT_TAGS = "legacy_xyz_project_tags"

const SIG_NAME = "legacy_xyz_name"
const SIG_DATE = "legacy_xyz_date"
const SIG_TWITTER_HANDLE = "legacy_xyz_twitter_handle"
const SIG_ADDR = "legacy_xyz_address"
// const SIG_MESSAGE = "legacy_xyz_message" // omitting from MVP because we don't want to deal with hiding unwanted messages
const SIG_ISVERIFIED = "legacy_xyz_is_verified"
const SIG_SIG = "legacy_xyz_signature"

const VERIFICATION_HANDLE = "legacy_xyz_verif_handle"
const VERIFICATION_ADDRESS = "legacy_xyz_verif_address"

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
    if (n.owner.address === CONTROLLER_ADDR) {
      const parsedHandle = n.tags.find(tag => tag.name === VERIFICATION_HANDLE).value
      const parsedAddress = n.tags.find(tag => tag.name === VERIFICATION_ADDRESS).value
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
  transaction.addTag(VERIFICATION_ADDRESS, address)
  await arweave.transactions.sign(transaction, KEY)
  return {
    ...await arweave.transactions.post(transaction),
    id: transaction.id,
  }
}

async function signGuestbook(projectId, address, name, handle, date, signature, isVerified) {
  console.log('signing guestbook', projectId, address, name, handle, date, signature, isVerified)
  let transaction = await arweave.createTransaction({ data: address }, KEY)
  transaction.addTag(DOC_TYPE, 'signature')
  transaction.addTag(PROJECT_ID, projectId)
  transaction.addTag(SIG_NAME, name)
  transaction.addTag(SIG_TWITTER_HANDLE, handle)
  transaction.addTag(SIG_ADDR, address)
  transaction.addTag(SIG_DATE, date)
  transaction.addTag(SIG_SIG, signature)
  transaction.addTag(SIG_ISVERIFIED, isVerified)
  await arweave.transactions.sign(transaction, KEY)
  return await arweave.transactions.post(transaction)
}

async function addProject(projectId, projectName, projectTwitter, projectWebsite, projectTags) {
  let transaction = await arweave.createTransaction({ data: projectName }, KEY)
  transaction.addTag(DOC_TYPE, 'project')
  transaction.addTag(PROJECT_ID, projectId)
  transaction.addTag(PROJECT_NAME, projectName)
  transaction.addTag(PROJECT_TAGS, projectTags)
  transaction.addTag(PROJECT_TWITTER, projectTwitter)
  transaction.addTag(PROJECT_WEBSITE, projectWebsite)
  transaction.addTag(PROJECT_TAGS, projectTags)

  await arweave.transactions.sign(transaction, KEY)
  return await arweave.transactions.post(transaction)
}

async function checkIfProjectRegistered(projectId, website, twitter) {
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
              values: ["project"]
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
    if (n.owner.address === CONTROLLER_ADDR) {
      const parsedProjectID = n.tags.find(tag => tag.name === PROJECT_ID).value
      const parsedProjectTwitter = n.tags.find(tag => tag.name === PROJECT_TWITTER).value
      const parsedProjectWebsite = n.tags.find(tag => tag.name === PROJECT_WEBSITE).value
      if (projectId === parsedProjectID) {
        return {
          registered: true,
          msg: `project id is already registered`,
          project: {
            projectId: parsedProjectID,
            projectWebsite: parsedProjectWebsite,
            projectTwitter: parsedProjectTwitter,
          }
        }
      } else if (twitter === parsedProjectTwitter) {
        return {
          registered: true,
          msg: `twitter handle (${twitterHandle}) is already registered with project id: ${parsedProjectID}`,
          project: {
            projectId: parsedProjectID,
            projectWebsite: parsedProjectWebsite,
            projectTwitter: parsedProjectTwitter,
          },
        }
      } else if (website === parsedProjectWebsite) {
        return {
          registered: true,
          msg: `website is already registered with project id: ${parsedProjectID}`,
          project: {
            projectId: parsedProjectID,
            projectWebsite: parsedProjectWebsite,
            projectTwitter: parsedProjectTwitter,
          }
        }
      }
    }
  }
  return {
    registered: false,
    msg: `this project is ready to be registered`,
  }
}

module.exports = {
  checkIfVerifiedAr,
  storeVerificationAr,
  signGuestbook,
  addProject,
  checkIfProjectRegistered,
}