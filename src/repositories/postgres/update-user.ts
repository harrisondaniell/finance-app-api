import { PostgresHelper } from "../../db/postgres/helper"

export interface UserInterfaceUpdate {
  firstName?: string;
  lastName?: string,
  email?: string;
  password?: string;
}

type UserKeys = keyof UserInterfaceUpdate;

export class PostgresUpdateUserRepository {
  async execute(userId : string, updateUserParams : UserInterfaceUpdate) {
    const updateFields : string[] = []
    const updateValues = []
    
    Object.keys(updateUserParams).forEach((key) => {
      const typedKey = key as UserKeys;
      updateFields.push(`${typedKey} = $${updateValues.length + 1}`);
      updateValues.push(updateUserParams[typedKey]);
    });

    updateValues.push(userId)

    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
      RETURNING *
    `
    const updateUser = await PostgresHelper.query(
      updateQuery,
      updateValues
    )
    return updateUser[0]
  }
}