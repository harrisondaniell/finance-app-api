import http from 'express'
import { CreateUserUseCase } from '../use-cases/create-user'
import { UserInterface } from '../repositories/postgres/create-user'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers'

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

      if (params.password.length < 6) {
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
      
      console.log(error)
      return serverError()
    }
  }
}