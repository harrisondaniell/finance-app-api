import dotenv from 'dotenv'
import express from 'express'



dotenv.config()
import { env } from './env'
import { PostgresHelper } from './db/postgres/helper'

const app = express()

app.get('/', async (req, res) => {

  const results = await PostgresHelper.query('select * from users;', null)
  res.send(results)
})

app.listen(3000, () => console.log('listening on port 3000'))