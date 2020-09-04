import { InvalidInputError } from "../Error/InvalidInputError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private fav_genres: string[],
    private picture: string,
    private likes?: string[] | undefined,
    private liked_by?: string[] | undefined,
    private all_time?: string | undefined,
    private been_listening?: string[] | undefined,
    private recommendations?: string[] | undefined
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getLikes(): string[] | undefined {
    return this.likes;
  }

  public getLikedBy(): string[] | undefined {
    return this.liked_by;
  }

  public getFavGenres(): string[] | undefined {
    return this.fav_genres;
  }

  public getAllTime(): string | undefined {
    return this.all_time;
  }

  public getPicture(): string {
    return this.picture;
  }

  public getBeenListening(): string[] | undefined {
    return this.been_listening;
  }

  public getRecommendations(): string[] | undefined {
    return this.recommendations;
  }
}
