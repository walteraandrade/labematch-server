import { BaseDatabase } from "./BaseDatabase";
import { Song } from "../models/Song";

export class SongDatabase extends BaseDatabase {
  public static TABLE_NAME = "labematch_songs";

  private toModel(dbModel?: any): Song | undefined {
    return new Song(
      dbModel.id,
      dbModel.name,
      dbModel.artist,
      dbModel.album,
      dbModel.year,
      dbModel.link
    );
  }

  public async newSong(song: Song): Promise<void> {
    await this.getConnection().raw(`
        INSERT INTO ${SongDatabase.TABLE_NAME}
        VALUES(
            "${song.getId()}",
            "${song.getName()}",
            "${song.getArtist()}",
            "${song.getAlbum()}",
            "${song.getYear()}",
            "${song.getLink()}"
        )`);
  }
}
