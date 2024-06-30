import { EmailAlreadyInUseError } from "../errors/user";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email";
import { PostgresUpdateUserRepository, UserInterfaceUpdate } from "../repositories/postgres/update-user";
import bcrypt from 'bcrypt'

export class UpdateUserUserCase {
  async execute(userId : string, updateUserParams : UserInterfaceUpdate) {
    if (updateUserParams.email) {
      const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository()

      const userWithProvideEmail = await postgresGetUserByEmailRepository.execute(
        updateUserParams.email
      )
  
      if (userWithProvideEmail) {
        throw new EmailAlreadyInUseError(updateUserParams.email)
      }
    }

    const user = {
      ...updateUserParams
    }

    if (updateUserParams.password) {
    const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

      user.password = hashedPassword
    }

    const postgresUpdateUserrepository = new PostgresUpdateUserRepository
    const updateUser = await postgresUpdateUserrepository.execute(
      userId,
      user
    )

    return updateUser

  }
}