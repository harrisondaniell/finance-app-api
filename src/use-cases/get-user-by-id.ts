import { PostgresGetUserByIdRepository } from "../repositories/postgres/get-user-by-id";

export class GetUserByIdUseCase {
  async execute(userId : string) {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const user = await getUserByIdRepository.execute(userId)

    return user
  }
}