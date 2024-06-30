import http from 'express'
import { badRequest, ok, serverError } from './helpers/http'
import { UserInterfaceUpdate } from '../repositories/postgres/update-user'
import validator from 'validator'
import { UpdateUserUserCase } from '../use-cases/update-user'
import { EmailAlreadyInUseError } from '../errors/user'
import { checkIfPasswordIsValid, checkIfemailIsValid, emailIsAlreadyInUseResponse, invalidIdResponse, invalidPasswordResponse } from './helpers/user'

export class UpdateUserController {
  async execute(httpRequest : http.Request) {
    try {
      const userId = httpRequest.params.userId
      const isIdValid = validator.isUUID(userId)

      if(!isIdValid) {
        invalidIdResponse()
      }

      const params : UserInterfaceUpdate = httpRequest.body

      const allowedFields = ['first_name', 'last_name', 'email', 'password']
  
      const someFieldIsNotAllowed = Object.keys(params).some(field => !allowedFields.includes(field))
  
      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed'
        })
      }
  
      if (params.password) {
        const passwordIsValid = checkIfPasswordIsValid(params.password)
        if (passwordIsValid) {
          invalidPasswordResponse()
        }
      }
  
      if (params.email) {
        const emailIsValid = checkIfemailIsValid(params.email)
  
        if (!emailIsValid) {
          emailIsAlreadyInUseResponse()
        }
      }

      const updateUserUserCase = new UpdateUserUserCase()

      const updateUser = await updateUserUserCase.execute(
        userId,
        params
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