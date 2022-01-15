import Cors from 'cors'
import Twitter from 'twitter'
import { checkIfVerifiedAr, storeVerificationAr } from '../helpers/arweave';

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

const TWEET_TEMPLATE = "I'm building my digital legacy today. Verifying for @legacy_xyz signature:"

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
})

const handler = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors)

  return new Promise((resolve, reject) => {
    /** validate req type **/
    if (req.method !== 'POST') {
      res.status(400).json({ msg: 'Only POST requests allowed' });
      return;
    }

    const { query: { handle } } = req;
    console.log(req.body);

    const body = JSON.parse(req.body)

    const { signature } = body;

    if (!handle) {
      res.status(400).json({ msg: 'Handle is required' });
      return;
    }

    if (!signature) {
      res.status(400).json({ msg: 'Signature is required in the body' });
      return;
    }

    console.log('verifying', handle, signature);

    client.get('statuses/user_timeline', {
      screen_name: handle,
      include_rts: false,
      count: 5,
      tweet_mode: 'extended',
    }, (error, tweets, _) => {

      if (!error) {
        for (const tweet of tweets) {
          const parsedSignature = tweet.full_text.slice(TWEET_TEMPLATE.length).split(" ")[0];
          if (tweet.full_text.startsWith(TWEET_TEMPLATE) && (parsedSignature === signature)) {
            // check to see if already linked

            checkIfVerifiedAr(handle, signature)
              .then(result => {
                if (result) {
                  // already linked
                  console.log(`already verified user: @${handle}`)
                  // sigCache.set(handle, result)
                  res.json({ tx: result })
                } else {
                  // need to link
                  storeVerificationAr(handle, signature)
                    .then((tx) => {
                      console.log(`new verified user: @${handle}, ${signature}`)
                      // sigCache.set(handle, tx)
                      res.status(201).json(tx)
                    })
                    .catch(e => {
                      console.log(`err @ /verify/:handle : ${e}`)
                      res.status(500).json(e)
                    });
                }
              });
            return
          }
        }
        res.status(400).json({ msg: 'No matching Tweets found' })
      } else {
        console.log('verifying error', error);
        res.status(500).json({ msg: 'Twitter Client Internal Error' })
      }
    })
  })
}

export default handler