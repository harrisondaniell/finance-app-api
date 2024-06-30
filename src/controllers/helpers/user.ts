import validator from "validator"
import { badRequest } from "./http"

export const invalidPasswordResponse = () => 
  badRequest({
    message: 'Password must be at least 6 characters'
  })

export const emailIsAlreadyInUseResponse =  () => 
  badRequest({
    message: 'Invalid e-mail. Please provide a valide one.'
  })

  export const invalidIdResponse = () => {
    badRequest({
      message: 'The provided id is not valid'
    })
  }

  export const checkIfPasswordIsValid = (password : string) : boolean => (
    password.length >= 6
  )

  export const checkIfemailIsValid = (email : string) : boolean => (
    validator.isEmail(email)
  )