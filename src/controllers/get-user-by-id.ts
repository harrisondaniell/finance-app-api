import http from 'express'
import {checkIfIdValid, invalidIdResponse, badRequest, notFound, ok, userNotFoundResponse } from './helpers/index'
import { GetUserByIdUseCase } from '../use-cases/index'

 
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
        return userNotFoundResponse()
      }
      return ok(user)
    } catch (error) {
      console.error(error)
      return badRequest({message: 'fail'})
    }
  }
}