import dotenv from 'dotenv'
import express, { response } from 'express'
import { env } from './env'
import { CreateUserController, GetUserByIdController, UpdateUserController } from './controllers/index'


dotenv.config()

const app = express()

app.use(express.json());


 app.post('/api/users', async (request, response) => {
  const createUserController = new CreateUserController()

  const {body, statusCode} = await createUserController.execute(request)

  response.status(statusCode).send(body)
 })

 app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = new UpdateUserController()

  const {body, statusCode} = await updateUserController.execute(request)

  response.status(statusCode).send(body)
 })

 app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = new GetUserByIdController()

  const { statusCode, body } = await getUserByIdController.execute(request)

  response.status(statusCode).send(body)
 })


app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`))