import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

//
import {config} from './config'

const app = express()

app.use(cors({credentials: true, origin: config.clientUrl}))
app.use(cookieParser())


app.get('/', (req, res) => res.send('api is healthy'))
app.get('/github', async(req, res) => {})
app.post('/refresh', async(req, res) => {})
app.post('/logout', (req, res) => {})
app.post('/logout-all', async(req, res) => {})
app.get('/me', async (req, res) => {})

app.listen(3721);
