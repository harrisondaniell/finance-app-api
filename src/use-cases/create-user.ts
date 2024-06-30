import { v4 as uuidv4 } from 'uuid';
import  bcrypt  from 'bcrypt'
import { PostgresCreateUserRepository, UserInterface, PostgresGetUserByEmailRepository } from '../repositories/postgres/index';
 
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