import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../middleware/HashManager";
import { TokenGenerator } from "../middleware/TokenGenerator";
import { IdGenerator } from "../middleware/IdGenerator";
import { InvalidInputError } from "../Error/InvalidInputError";
import { NotFound } from "../Error/NotFound";
import { User } from "../models/User";
import { Unauthorized } from "../Error/Unauthorized";
import { userRouter } from "../routes/UserRouter";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) {}

  public async signup(
    name: string,
    email: string,
    password: string,
    favGenres: string[],
    picture: string
  ) {
    if (!name || !email || !password || !favGenres || !picture) {
      throw new InvalidInputError("There is an input missing");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidInputError("Invalid email format");
    }

    if (password.length < 6) {
      throw new InvalidInputError("Invalid password");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);

    await this.userDatabase.signUp(
      new User(id, name, email, cryptedPassword, favGenres, picture)
    );

    const accessToken = this.tokenGenerator.generate({
      id,
    });
    return { accessToken };
  }

  public async login(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new InvalidInputError("You need both parameters to log in!");
    }
    const user = await this.userDatabase.fetchEmail(email);

    if (!user) {
      throw new NotFound("User not found");
    }

    const validatePassword = await this.hashGenerator.compareHash(
      password,
      user.getPassword()
    );

    if (!validatePassword) {
      throw new InvalidInputError("Invalid password");
    }

    const token = this.tokenGenerator.generate({
      id: user.getId(),
    });

    return token;
  }

  public async fetchGenres(token: string): Promise<any> {
    const result = this.tokenGenerator.verify(token);

    const user = await this.userDatabase.fetchData(result.id);

    return user?.getFavGenres();
  }
}
