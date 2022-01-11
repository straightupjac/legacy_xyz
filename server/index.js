require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const Twitter = require('twitter')
const Cache = require('./cache')
const {checkIfVerifiedAr, storeVerificationAr, signDocumentAr, } = require("./arweave")

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const port = process.env.PORT || 8080

// TODO: pass through client side
const TWEET_TEMPLATE = "I am verifying for @web3Guestbook: sig:"

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})

const sigCache = new Cache()

// health check
app.get('/', (req, res) => {
  res.send('ok')
})

// POST body inclues projectId, name, address from web3 provider, handle, message and signature
app.post('/sign/:project', (req, res) => {
  const projectId = req.params.project
  const {
    name,
    address,
    handle,
    message,
    signature,
  } = req.body

  // check if user included handle
  if (handle) {
    // check if user is verified
    const signPromise = sigCache.has(handle) ?
      signDocumentAr(projectId, documentId, address, name, handle, message, signature, true) :
      checkIfVerifiedAr(handle, signature).then(result => {
        const verified = !!result; // force into boolean format (if true would be an ID, if false would be false)
        return signDocumentAr(documentId, address, name, handle, signature, verified)
      })

    promise
      .then((data) => {
        console.log(`new signee: ${name}, @${handle}, ${address}`)
        res.json(data)
      })
      .catch(e => {
        console.log(`err @ /sign/:document : ${e}`)
        res.status(500)
      });
  } else {
    // only wallet signature without twitter
    signDocumentAr(documentId, address, name, '', signature, false)
      .then((data) => res.json(data))
      .catch(e => {
        console.log(`err @ /sign/:document : ${e}`)
        res.status(500)
      })
  }
})

// POST body provides address
app.post('/verify/:handle', (req, res) => {
  const handle = req.params.handle
  const {
    address: signature,
  } = req.body

  if (sigCache.has(handle)) {
    console.log(`already verified user: @${handle}`)
    const txId = sigCache.get(handle)
    res.json({ tx: txId })
    return
  }

  client.get('statuses/user_timeline', {
    screen_name: handle,
    include_rts: false,
    count: 5,
    tweet_mode: 'extended',
  }, (error, tweets, response) => {

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
                sigCache.set(handle, result)
                res.json({ tx: result })
              } else {
                // need to link
                storeVerificationAr(handle, signature)
                  .then((tx) => {
                    console.log(`new verified user: @${handle}, ${signature}`)
                    sigCache.set(handle, tx)
                    res.status(201).json(tx)
                  })
                  .catch(e => {
                    console.log(`err @ /verify/:handle : ${e}`)
                    res.status(500).send(JSON.stringify(e))
                  });
              }
            });
          return
        }
      }
      res.status(500).json({message: 'No matching Tweets found'})
    } else {
      res.status(500).send({message: 'Internal Error'})
    }
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
