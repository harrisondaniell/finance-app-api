import http from 'express'
import { badRequest, created, ok } from './helpers'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id'
import validator from 'validator'
 
export class GetUserByIdController {
  async execute(httpRequest : http.Request) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId)

      if(!isIdValid) {
        return badRequest({
          message: 'The provided id is not valid.'
        })
      }

      const getUserByIdUseCase = new GetUserByIdUseCase()

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId)

      return ok(user)
    } catch (error) {
      console.error(error)
      return badRequest({message: 'fail'})
    }
  }
}