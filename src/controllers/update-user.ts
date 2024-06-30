import http from 'express'
import { badRequest, ok, serverError } from './helpers'
import { UserInterfaceUpdate } from '../repositories/postgres/update-user'
import validator from 'validator'
import { UpdateUserUserCase } from '../use-cases/update-user'
import { EmailAlreadyInUseError } from '../errors/user'

export class UpdateUserController {
  async execute(httpRequest : http.Request) {
    try {
      const userId = httpRequest.params.userId
      const isIdValid = validator.isUUID(userId)

      if(!isIdValid) {
         return badRequest({
          message: 'The provided ID is not valid.'
         })
      }

      const updateUserParams : UserInterfaceUpdate = httpRequest.body

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
  
      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(field => !allowedFields.includes(field))
  
      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed'
        })
      }
  
      if (updateUserParams.password) {
        const passwordIsNotValid = updateUserParams.password.length < 6
        if (passwordIsNotValid) {
          let body = {message: 'Password must be at least 6 characters'}
          return badRequest(body)
        }
      }
  
      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email)
  
        if (!emailIsValid) {
          let body = {message: 'Invalid e-mail. Please provide a valide one.'}
          return badRequest(body)
        }
      }

      const updateUserUserCase = new UpdateUserUserCase()

      const updateUser = await updateUserUserCase.execute(
        userId,
        updateUserParams
      )

      return ok(updateUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: error.message
        })
      }
      console.log(error)
      return serverError()
    }

  }
}