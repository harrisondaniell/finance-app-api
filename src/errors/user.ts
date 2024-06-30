export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`The provided ${email} is already in use`)
    this.name = 'EmailAlreadyInUseError'
  }
}