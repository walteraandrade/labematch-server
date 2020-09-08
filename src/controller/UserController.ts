import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { HashGenerator } from "../middleware/HashManager";
import { TokenGenerator } from "../middleware/TokenGenerator";
import { IdGenerator } from "../middleware/IdGenerator";
import { Request, Response } from "express";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  );

  async signUp(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signup(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.favGenres,
        req.body.picture
      );

      res.status(200).send(result);
    } catch (error) {
      res.status(error.errorCode || 400).send({
        message: error.message,
      });
    }
    BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const token = await UserController.UserBusiness.login(
        req.body.email,
        req.body.password
      );

      res.status(200).send({
        token: token,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
    BaseDatabase.destroyConnection();
  }

  async fetchProfile(req: Request, res: Response) {
    try {
      const token = req.headers.token as string;

      const result = await UserController.UserBusiness.fetchUserProfile(token);

      res.status(200).send({
        user: result,
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    BaseDatabase.destroyConnection();
  }
}
