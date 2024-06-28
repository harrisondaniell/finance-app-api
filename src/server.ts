import dotenv from 'dotenv'
import express, { response } from 'express'
import { env } from './env'
import { CreateUserController } from './controllers/create-user'
import { GetUserByIdController } from './controllers/get-user-by-id'

dotenv.config()

const app = express()

app.use(express.json());


 app.post('/api/users', async (request, response) => {
  const createUserController = new CreateUserController()

  const {body, statusCode} = await createUserController.execute(request)

  response.status(statusCode).send(body)
 })

 app.get('./api/users/:usersId', async (request, response) => {
  const getUserByIdController = new GetUserByIdController()

  const { statusCode, body } = await getUserByIdController.execute(request)

  response.status(statusCode).send(body)
 })


app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`))