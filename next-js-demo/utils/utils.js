import { ethers } from "ethers";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080";

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

export async function verify(sig, handle) {

  return fetch(`${SERVER_URL}/verify/${cleanHandle(handle)}`, {
    method: 'post',
    body: {
      signature: sig,
    },
  }).then(jsonOrErrorHandler)
}

export async function sign(projectId, name, account, twitter, signature) {
  return fetch(`${SERVER_URL}/sign/${projectId}`, {
    method: 'post',
    body: {
      name,
      address: account,
      handle: twitter,
      date: Date.now(),
      signature,
    },
  }).then(jsonOrErrorHandler)
}

export async function add(projectId, name, twitter, website) {
  return fetch(`${SERVER_URL}/add`, {
    method: 'post',
    body: {
      projectId,
      projectName: name,
      projectTwitter: twitter,
      projectWebsite: website,
    },
  }).then(jsonOrErrorHandler)
}
