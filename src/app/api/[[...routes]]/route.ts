import { healthcheckHandler } from "@mapstudio/server/handlers/healthcheck"
import { Hono } from "hono"
import { handle } from "hono/vercel"

export const app = new Hono().basePath("/api")

export const routes = app.route("/v1/healthcheck", healthcheckHandler)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
