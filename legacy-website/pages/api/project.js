import Cors from 'cors'
import Redis from 'ioredis';

// Initializing the cors middleware
// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'],
})

const projCache = new Redis();

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
}

export default handler