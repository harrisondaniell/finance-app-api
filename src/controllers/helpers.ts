export const badRequest = (body : object) => {
  return {
    statusCode: 400,
    body,
  }
}