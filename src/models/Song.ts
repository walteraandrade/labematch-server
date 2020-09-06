export class Song {
  constructor(
    private id: string,
    private name: string,
    private artist: string,
    private album: string,
    private year: string,
    private link: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getArtist(): string {
    return this.artist;
  }

  public getAlbum(): string {
    return this.album;
  }

  public getYear(): string {
    return this.year;
  }

  public getLink(): string {
    return this.link;
  }
}
