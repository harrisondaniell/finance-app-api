import { PostgresDeleteUserRepository, UserInterface } from "../repositories/postgres/index";

export class DeleteUserUseCase {
  async execute(userId : string) {
    const postgresDeleteUserByIdRepository = new PostgresDeleteUserRepository()

    const deletedUser = await postgresDeleteUserByIdRepository.execute(userId)

    return deletedUser
  }
}