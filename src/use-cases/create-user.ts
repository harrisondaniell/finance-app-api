import { v4 as uuidv4 } from 'uuid';
import  bcrypt  from 'bcrypt'
import {randomUUID} from 'node:crypto'
import { PostgresCreateUserRepository, UserInterface } from '../repositories/postgres/create-user';

export class CreateUserUseCase {
  async execute(createUserParams: UserInterface) {

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