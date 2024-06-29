import { v4 as uuidv4 } from 'uuid';
import  bcrypt  from 'bcrypt'
import {randomUUID} from 'node:crypto'
import { PostgresCreateUserRepository, UserInterface } from '../repositories/postgres/create-user';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email';
import { EmailAlreadyInUseError } from '../errors/user';

export class CreateUserUseCase {
  async execute(createUserParams: UserInterface) {

    const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository()

    const userWithProvideEmail = await postgresGetUserByEmailRepository.execute(
      createUserParams.email
    )

    if (userWithProvideEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email)
    }

    const userId = uuidv4()
    
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    const user: UserInterface  = {
      ...createUserParams,
      ID: userId,
      password: hashedPassword
    }

    const postgresCreateUserRepository = new PostgresCreateUserRepository

    const createdUser = await postgresCreateUserRepository.execute(user)

    return createdUser

  }
}