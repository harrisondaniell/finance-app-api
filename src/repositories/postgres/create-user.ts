import { PostgresHelper } from "../../db/postgres/helper";

export interface UserInterface {
  ID: string;
  firstName: string;
  lastName: string,
  email: string;
  password: string;
}

export class PostgresCreateUserRepository {
  async execute(createUserParams: UserInterface) {
   await PostgresHelper.query(
      'insert into users (ID, first_name, last_name, email, password) values ($1, $2, $3, $4, $5)',
      [
        createUserParams.ID,
        createUserParams.firstName,
        createUserParams.lastName,
        createUserParams.email,
        createUserParams.password,
      ]
    )

    const createdUser = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [createUserParams.ID]
    )
    return createdUser[0]
  }
}