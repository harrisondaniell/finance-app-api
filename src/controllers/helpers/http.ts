import { UserInterface } from "../../repositories/postgres/create-user"

interface BodyInterface {
  message: String
}

export const badRequest = (body : BodyInterface) : object => ({
    statusCode: 400,
    body
  })


export const created = (body : BodyInterface) : object =>  ({
    statusCode: 201,
    body,
  })

export const serverError = () : object => ({
    statusCode: 500,
    body: {
      message: 'Internal server error'
    }
  })


export const ok = (body : UserInterface) : object => ({
    statusCode: 200, 
    body,
  })


export const notFound = (body : BodyInterface) : object => ({
  statusCode: 404,
  body
})

