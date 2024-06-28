import http from 'express'
import { badRequest } from './helpers'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id'
 
export class GetUserByIdController {
  async execute(httpRequest : http.Request) {
    try {

      const getUserByIdUseCase = new GetUserByIdUseCase()

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId)
    } catch (error) {
      console.error(error)
      return badRequest({})
    }
  }
}