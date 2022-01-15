import Cors from 'cors'
import { checkIfProjectRegistered, checkIfVerifiedAr, signGuestbook } from '../helpers/arweave';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  /** validate req type **/
  if (req.method !== 'POST') {
    res.status(400).json({ msg: 'Error' });
    return;
  }

  const { query: { projectId } } = req;

  const {
    name,
    address,
    handle,
    date,
    signature,
  } = req.body

  console.log('sign', projectId, name,
    address,
    handle,
    date,
    signature);

  checkIfProjectRegistered(projectId).then((result) => {
    const { registered, msg } = result;
    if (!registered) {
      res.status(400).json(`This project (${projectId}) is not registered`);
      return;
    }
  }).catch((err) => {
    console.log(`err @ /project : ${err}`)
    res.status(500)
    return resolve();
  })

  // check if user included handle
  if (handle) {
    // check if user is verified
    const promise =
      checkIfVerifiedAr(handle, signature).then(result => {
        const verified = !!result; // force into boolean format (if true would be an ID, if false would be false)
        return signGuestbook(projectId, address, name, handle, date, signature, verified)
      })

    promise
      .then((data) => {
        console.log(`new signee: ${name}, @${handle}, ${address}`)
        res.json(data)
        return;
      })
      .catch(e => {
        console.log(`err @ /sign/:project : ${e}`)
        res.status(500)
        return;
      });
  } else {
    // only wallet signature without twitter
    signGuestbook(projectId, address, name, '', date, signature, false)
      .then((data) => res.json(data))
      .catch(e => {
        console.log(`err @ /sign/:project : ${e}`)
        res.status(500)
        return;
      })
  }
}

export default handler