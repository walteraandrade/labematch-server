import { InvalidInputError } from "../Error/InvalidInputError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private fav_genres: string[],
    private picture: string,
    private likes?: string[],
    private liked_by?: string[],
    private all_time?: string,
    private been_listening?: string[],
    private recommendations?: string[]
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

  public getLikes(): string[] {
    return this.likes;
  }

  public getLikedBy(): string[] {
    return this.liked_by;
  }

  public getFavGenres(): string[] {
    return this.fav_genres;
  }

  public getAllTime(): string {
    return this.all_time;
  }

  public getPicture(): string {
    return this.picture;
  }

  public getBeenListening(): string[] {
    return this.been_listening;
  }

  public getRecommendations(): string[] {
    return this.recommendations;
  }
}
