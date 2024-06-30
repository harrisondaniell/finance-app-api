import http from 'express'
import { badRequest, created, notFound, ok } from './helpers/http'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id'
import { checkIfIdValid, invalidIdResponse } from './helpers/user'
 
export class GetUserByIdController {
  async execute(httpRequest : http.Request) {
    try {
      const isIdValid = checkIfIdValid(httpRequest.params.userId)

      if(!isIdValid) {
        invalidIdResponse()
      }

      const getUserByIdUseCase = new GetUserByIdUseCase()

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId)

      if (!user) {
        return notFound({
          message: 'User not found'
        })
      }
      return ok(user)
    } catch (error) {
      console.error(error)
      return badRequest({message: 'fail'})
    }
  }
}