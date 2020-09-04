import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Unauthorized } from "../Error/Unauthorized";
dotenv.config();

export class TokenGenerator {
  private static expiresIn: number = 1200;

  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: TokenGenerator.expiresIn,
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id };
    if (!result) {
      return result;
    } else {
      return new Unauthorized("You do not have access do that.");
    }
  }
}

export interface AuthenticationData {
  id: string;
}
