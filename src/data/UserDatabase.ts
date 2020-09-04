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
        dbModel.picture,
        dbModel.likes,
        dbModel.liked_by,
        dbModel.all_time,
        dbModel.been_listening,
        dbModel.recommendations
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
              "${user.getPicture()}",
              "${user.getLikes()}",
              "${user.getLikedBy()}",
              "${user.getAllTime()}",
              "${user.getBeenListening()}",
              "${user.getRecommendations()}"
          )`);
  }

  public async fetchEmail(email: string): Promise<User | undefined> {
    const result = await this.getConnection().raw(`
    SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE email = "${email}"`);
    console.log(result);
    return this.toModel(result[0][0]);
  }
}
