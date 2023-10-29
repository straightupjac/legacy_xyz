require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const Twitter = require('twitter')
const Cache = require('./cache')
const { checkIfVerifiedAr, storeVerificationAr, signGuestbook, addProject, checkIfProjectRegistered } = require("./arweave")

app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 8080

// TODO: pass through client side
const TWEET_TEMPLATE = "I am verifying for @legacy_xyz. signature:"

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
})

const sigCache = new Cache()
const projCache = new Cache()

// health check
app.get('/', (_, res) => {
  res.send('ok')
})

// POST body inclues projectId, name, address from web3 provider, handle, message and signature
app.post('/sign/:project', (req, res) => {
  const projectId = req.params.project
  const {
    name,
    address,
    handle,
    date,
    signature,
  } = req.body

  checkIfProjectRegistered(projectId).then((result) => {
    const { registered, msg } = result;
    if (!registered) {
      res.status(400).json(`This project (${projectId}) is not registered`);
      return;
    }
  }).catch((err) => {
    console.log(`err @ /project : ${err}`)
    res.status(500)
  })

  // check if user included handle
  if (handle) {
    // check if user is verified
    const promise = sigCache.has(handle) ?
      signGuestbook(projectId, address, name, handle, date, signature, true) :
      checkIfVerifiedAr(handle, signature).then(result => {
        const verified = !!result; // force into boolean format (if true would be an ID, if false would be false)
        return signGuestbook(projectId, address, name, date, handle, signature, verified)
      })

    promise
      .then((data) => {
        console.log(`new signee: ${name}, @${handle}, ${address}`)
        res.json(data)
      })
      .catch(e => {
        console.log(`err @ /sign/:project : ${e}`)
        res.status(500)
      });
  } else {
    // only wallet signature without twitter
    signGuestbook(projectId, address, name, '', date, signature, false)
      .then((data) => res.json(data))
      .catch(e => {
        console.log(`err @ /sign/:project : ${e}`)
        res.status(500)
      })
  }
})

// POST body provides address
app.post('/verify/:handle', (req, res) => {
  const handle = req.params.handle
  const {
    signature,
  } = req.body;

  console.log('verifying', handle, signature);

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
      res.status(500).json({ message: 'No matching Tweets found' })
    } else {
      console.log('verifying error', error);
      res.status(500).send({ message: 'Twitter Client Internal Error' })
    }
  })
})

// POST body provides project id, project name, project website (optional), project twitter (optional)
app.post('/project', (req, res) => {
  const {
    projectId,
    projectName,
    projectWebsite,
    projectTwitter,
    projectTags,
  } = req.body;

  console.log('adding project', projectId);

  if (projCache.has(projectId)) {
    const project = projCache.get(project);
    console.log(`already registered project: ${projectId} called ${project.projectName} with the following params: twitter: ${project.projectTwitter}, website: ${project.projectWebsite}`)
    res.json(
      {
        success: false,
        msg: `already registered project: ${projectId} called ${project.projectName} with the following params: twitter: ${project.projectTwitter}, website: ${project.projectWebsite}`,
      })
    return
  }
  else {
    checkIfProjectRegistered(projectId, projectWebsite, projectTwitter).then((result) => {
      const { registered, msg, project } = result;
      if (registered) {
        projCache.set(projectId, project);
        res.status(400).json(msg);
      } else {
        addProject(projectId, projectName, projectWebsite, projectTwitter, projectTags).then((data) => {
          console.log(`new project: ${projectId}, ${projectName}, ${projectWebsite}, ${projectTwitter}`)
          res.json(data);
        }).catch((err) => {
          console.log(`err @ /project addProject: ${err}`)
          res.status(500)
        })
      }
    }).catch((err) => {
      console.log(`err @ /project checkIfProjectRegistered: ${err}`)
      res.status(500)
    })
  }
})



app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
