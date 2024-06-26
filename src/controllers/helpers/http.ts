import { UserInterface } from "../../repositories/postgres/create-user"
import http from 'express'

export interface BodyInterface {
  message: String | void
}


export const badRequest = (body : BodyInterface)  => ({
    statusCode: 400,
    body
  })


export const created = (body : BodyInterface)  =>  ({
    statusCode: 201,
    body,
  })

export const serverError = ()  => ({
    statusCode: 500,
    body: {
      message: 'Internal server error'
    }
  })


export const ok = (body : UserInterface)   => ({
    statusCode: 200, 
    body,
  })


export const notFound = (body : BodyInterface)  => ({
  statusCode: 404,
  body
})

