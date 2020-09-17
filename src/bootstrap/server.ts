import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Express } from "express-serve-static-core";
import * as dotenvExtended from "dotenv-extended";
import * as dotenvParseVariables from "dotenv-parse-variables";
import * as winston from "winston";

const env = dotenvExtended.load({
  path: process.env.ENV_FILE || "./config/.env.test",
  defaults: "./config/.env.defaults",
  schema: "./config/.env.schema",
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

import { Middleware } from "./middleware";
import { Logger } from "./logger";
import { routes } from "../routes";
import { Router } from "./router";

// create express app
const app = express();
const router = new express.Router();
let server = null;
let serverIsLive = false;

export async function createdServer(): Promise<Express> {
  if (serverIsLive) return server;
  server = await createServer();
  if (server) serverIsLive = true;
  return server;
}

// RUN tests in memory === faster
const type = process.env.ENV === "test" ? "sqlite" : "mysql";
// Use bastion or not
const host = process.env.PORT
  ? process.env.DB_URL ||
    "daslab.cluster-c7hytbi1isvx.eu-central-1.rds.amazonaws.com"
  : "127.0.0.1";
// Mem db
const database = process.env.ENV === "test" ? ":memory:" : "main";
const port = process.env.ENV === "test" ? null : process.env.PORT ? 3306 : 3308;
const username = process.env.DB_USERNAME || "daslab";
const password = process.env.DB_PASSWORD || "password";
export async function createServer(): Promise<Express> {
  return await createConnection(
    JSON.parse(
      JSON.stringify({
        type,
        host,
        database,
        port,
        username,
        password,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        entities: [__dirname + "./../entities/*.ts"],
        synchronize: true,
      }),
    ),
  )
    .then(async (connection) => {
      await Logger();
      await Middleware(app);
      await Router(app, router, routes);

      return app;
    })
    .catch((error) => {
      /* istanbul ignore next */
      winston.error("[Express] Error: ", error);
    });
}
