import http from 'express'
import { CreateUserUseCase } from '../use-cases/create-user'
import { UserInterface } from '../repositories/postgres/create-user'
import { badRequest, created, serverError } from './helpers/http'
import { EmailAlreadyInUseError } from '../errors/user'
import { checkIfPasswordIsValid, checkIfemailIsValid, emailIsAlreadyInUseResponse, invalidPasswordResponse } from './helpers/user'

export class CreateUserController {
  async execute(httpRequest: http.Request) {
    try {
      const params : UserInterface = httpRequest.body

      const requireFields: (keyof UserInterface)[] = ['firstName', 'lastName', 'email', 'password'];
    

      for (const field of requireFields) {
        if (!params[field] || params[field].trim().length === 0) {
          let body = {message: `Missing param: ${field}`}
          return badRequest(body)
        }
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password)

      if (!passwordIsValid) {
        invalidPasswordResponse()
      }
      const emailIsValid = checkIfemailIsValid(params.email)

      if (!emailIsValid) {
        emailIsAlreadyInUseResponse()
      }
  
      const createUserUseCase = new CreateUserUseCase()
      const createdUser = await createUserUseCase.execute(params)
  
      return created(createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({message: error.message})
      }
      console.log(error)
      return serverError()
    }
  }
}