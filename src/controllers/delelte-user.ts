import { ok } from 'assert'
import { DeleteUserUseCase } from '../use-cases/index'
import { checkIfIdValid, invalidIdResponse, serverError } from './helpers/index'

import http from 'express'

export class DeleteUserController {
  async execute(httpRequest : http.Request) {
    try {
      const userId = httpRequest.params.userId
      const idIsValid = checkIfIdValid(userId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const deleteUserUseCase = new DeleteUserUseCase()
      const deletedUser = await deleteUserUseCase.execute(userId)
      return ok(deletedUser)

    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}