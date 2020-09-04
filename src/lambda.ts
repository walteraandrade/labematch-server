import serverless from "serverless-http";
import { app } from "./index"; // ou o path correto do app
import "mysql";

export const handler = serverless(app);
