import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

//
import {config} from './config'
import {getGitHubUser} from './github-adapter'
import {databaseClient} from './database'
import {buildTokens, clearTokens, refreshTokens, setTokens, verifyRefreshToken} from './token-utils'
import {
  createUser,
  getUserByGitHubId,
  getUserById,
  increaseTokenVersion,
  setupUserIndexes,
} from './user-service'


// web server
const app = express()

app.use(cors({credentials: true, origin: config.clientUrl}))
app.use(cookieParser())


app.get('/', (req, res) => res.send('api is healthy'))

app.get('/github', async(req, res) => {
  const {code} = req.query

  const gitHubUser = await getGitHubUser(code as string)
  let user = await getUserByGitHubId(gitHubUser.id)
  if (!user) user = await createUser(gitHubUser.name, gitHubUser.id)

  const {accessToken, refreshToken} = buildTokens(user)
  setTokens(res, accessToken, refreshToken)

  res.redirect(`${config.clientUrl}/me`)

})

app.post('/refresh', async(req, res) => {})
app.post('/logout', (req, res) => {})
app.post('/logout-all', async(req, res) => {})
app.get('/me', async (req, res) => {})



async function main() {
  // connect to mongodb
  await databaseClient.connect()
  //await setupUserIndexes()

  app.listen(3721);
}


main()


 