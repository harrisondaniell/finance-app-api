import http from 'express'
import { badRequest } from './helpers'
 
export class getByIdController {
  async execute(httpRequest : http.Request) {
    try {
      const { userId } = httpRequest.params
    } catch (error) {
      return badRequest({})
    }
  }
}