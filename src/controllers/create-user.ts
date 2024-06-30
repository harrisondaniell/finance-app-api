import http from 'express'
import { CreateUserUseCase } from '../use-cases/create-user'
import { UserInterface } from '../repositories/postgres/create-user'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers'
import { EmailAlreadyInUseError } from '../errors/user'

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

      const passwordIsNotValid = params.password.length < 6

      if (passwordIsNotValid) {
        let body = {message: 'Password must be at least 6 characters'}
        return badRequest(body)
      }
      const emailIsValid = validator.isEmail(params.email)

      if (!emailIsValid) {
        let body = {message: 'Invalid e-mail. Please provide a valide one.'}
        return badRequest(body)
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