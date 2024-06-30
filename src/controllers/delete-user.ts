
import { DeleteUserUseCase } from '../use-cases/index'
import { checkIfIdValid, invalidIdResponse, notFound, ok, serverError, userNotFoundResponse } from './helpers/index'
import http from 'express'



export class DeleteUserController  {
  async execute(httpRequest : http.Request) {
    try {

      const idIsValid = checkIfIdValid(httpRequest.params.userId)
      if (!idIsValid) {
         return invalidIdResponse()
      }

      const deleteUserUseCase = new DeleteUserUseCase()
      const deletedUser = await deleteUserUseCase.execute(httpRequest.params.userId)

      if(!deletedUser) {
        return userNotFoundResponse()
      }

      return ok(deletedUser)

    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}