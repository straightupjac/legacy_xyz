import { ethers } from "ethers";

const SERVER_URL = "https://legacy-xyz.vercel.app/api";

export async function generateSignature(message) {
  if (!window.ethereum) {
    throw new Error("No wallet found. Please install Metamask or another Web3 wallet provider.");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(message.trim())
}

export const jsonOrErrorHandler = async response => {
  const resp = response.json()
  if (response.ok) {
    return resp;
  }

  if (resp) {
    const error = await resp
    throw new Error(error.message ?? error.errors[0].message)
  } else {
    throw new Error('Internal server error')
  }
}

const cleanHandle = handle => handle[0] === "@" ? handle.substring(1) : handle;

export async function verify(sig, handle) {
  return fetch(`${SERVER_URL}/verify/${cleanHandle(handle)}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        signature: sig,
      }
    ),
  }).then(jsonOrErrorHandler)
}

export async function sign(projectId, name, account, twitter, signature) {
  return fetch(`${SERVER_URL}/sign/${projectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name: name,
        address: account,
        handle: cleanHandle(twitter),
        date: Date.now(),
        signature: signature,
      }),
  }).then(jsonOrErrorHandler)
}

export async function add(projectId, name, twitter, website) {
  return fetch(`${SERVER_URL}/add`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: new JSON.stringify(
      {
        projectId,
        projectName: name,
        projectTwitter: twitter,
        projectWebsite: website,
      }
    ),
  }).then(jsonOrErrorHandler)
}

/* unauthed request (don't need to use the server) */

const CONTROLLER_ADDR = "AaaKkDKK4yEllFoZtzv_oFjtlw7LjCZzhpZRWThIJqA";
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

export async function getSigners(projectId) {
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
          first: 100,
          sort: HEIGHT_ASC,
          tags: [
            {
              name: "${DOC_TYPE}",
              values: ["signature"]
            },
            {
              name: "${PROJECT_ID}",
              values: ["${projectId}"]
            }
          ],
          owners: ["${CONTROLLER_ADDR}"],
        ) {
          edges {
            cursor
            node {
              id
              tags {
                name
                value
              }
              block {
                  id
                  timestamp
              }
            }
          }
        }
      }
      `
    })
  }).then(jsonOrErrorHandler);

  const safeTag = (node, tagName, defaultValue) => {
    const tag = node.tags.find(tag => tag.name === tagName)
    return tag ? tag.value : defaultValue;
  }

  return req.data.transactions.edges.flatMap((nodeItem) => {
    const cursor = nodeItem.cursor;
    const n = nodeItem.node;
    const sig = safeTag(n, SIG_SIG, "UNKWN");
    const handle = safeTag(n, SIG_TWITTER_HANDLE, "UNSIGNED");
    let verified = safeTag(n, SIG_ISVERIFIED, 'false') === 'true';

    return [{
      CURSOR: cursor,
      SIG_ID: n.id,
      SIG_ADDR: safeTag(n, SIG_ADDR, ""),
      SIG_NAME: safeTag(n, SIG_NAME, "Anonymous"),
      SIG_TWITTER_HANDLE: handle === 'null' ? 'UNSIGNED' : handle,
      SIG_DATE: safeTag(n, SIG_DATE, ''),
      SIG_ISVERIFIED: verified,
      SIG_SIG: sig,
    }];
  });
}

export function dedupe(sigs) {
  const unique_set = sigs.reduce((total, cur) => {
    if (!total.hasOwnProperty(cur.SIG_ADDR)) {
      if (!cur.SIG_ISVERIFIED) {
        cur.SIG_ISVERIFIED = checkIfVerifiedHandle(cur.SIG_TWITTER_HANDLE, cur.SIG_SIG);
      }
      // unique addr
      total[cur.SIG_ADDR] = cur
    } else {
      // dupe, can overwrite it current one is verified or old one is not verified
      const old = total[cur.SIG_ADDR]
      if (cur.SIG_ISVERIFIED) {
        total[cur.SIG_ADDR] = cur;
      }
      else if (!old.SIG_ISVERIFIED) {
        cur.SIG_ISVERIFIED = checkIfVerifiedHandle(old.SIG_TWITTER_HANDLE, old.SIG_SIG)
        total[cur.SIG_ADDR] = cur
      }
    }
    return total
  }, {})
  return Object.values(unique_set)
}

export async function checkIfVerifiedHandle(handle, signature) {
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
          first: 5,
          tags: [
            {
              name: "${DOC_TYPE}",
              values: ["verification"]
            },
            {
              name: "${VERIFICATION_ADDRESS}",
              values: ["${signature}"]
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
      if (handle.trim() === parsedHandle.trim() && signature === parsedAddress) {
        return true
      }
    }
  }
  return false
}
