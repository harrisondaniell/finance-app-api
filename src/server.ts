import dotenv from 'dotenv'
import express from 'express'
import { env } from './env'

dotenv.config()

const app = express()

 


app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`))