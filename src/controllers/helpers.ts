interface bodyInterface {
  message: String
}

export const badRequest = (body : bodyInterface) => {
  return {
    statusCode: 400,
    body
  }
}

export const created = (body : bodyInterface) => {
  return {
    statusCode: 201,
    body,
  }
}

export const serverError = () => {
  return {
    statusCode: 500,
    body: {
      message: 'Internal server error'
    }
  }
}

