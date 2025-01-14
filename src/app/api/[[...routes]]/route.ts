import { applicantsHandler } from "@mapstudio/server/handlers/applicants";
import { healthcheckHandler } from "@mapstudio/server/handlers/healthcheck";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.use(logger());
app.use(prettyJSON());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/v1/healthcheck", healthcheckHandler).route("/v1/applicants", applicantsHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
