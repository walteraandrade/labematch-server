import { BaseDatabase } from "./BaseDatabase";
import { User } from "../models/User";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME = "labematch_users";

  private toModel(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.email,
        dbModel.password,
        dbModel.fav_genres,
        dbModel.picture
      )
    );
  }

  public async signUp(user: User): Promise<void> {
    await this.getConnection().raw(`
          INSERT INTO ${UserDatabase.TABLE_NAME}
          VALUES (
              "${user.getId()}",
              "${user.getName()}",
              "${user.getEmail()}",
              "${user.getPassword()}",
              "${user.getFavGenres()}",
              "${user.getPicture()}"
          )`);
  }

  public async fetchEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE email = "${email}"`);

    return this.toModel(result[0][0]);
  }

  public async fetchData(id: string): Promise<Object | undefined> {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);
    const userData = result[0][0];
    const user = {
      name: userData.name,
      email: userData.email,
      favGenres: userData.fav_genres.split(","),
      picture: userData.picture,
    };
    return user;
  }

  public async fetchMatches(
    id: string,
    offset: number
  ): Promise<Object | undefined> {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE id <> '${id}' LIMIT 1 OFFSET ${offset}`);

    const userData = result[0][0];
    const user = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      favGenres: userData.fav_genres.split(","),
    };
    return user;
  }

  public async fetchPageNumbers(): Promise<number | undefined> {
    const result = await this.getConnection().raw(`
    SELECT COUNT(id) AS NumberOfUsers FROM labematch_users;`);

    return result[0][0].NumberOfUsers;
  }
}
