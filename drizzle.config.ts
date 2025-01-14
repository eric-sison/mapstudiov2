import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schemas/*.ts",
  out: "./src/server/db/migrations",
  extensionsFilters: ["postgis"],
  schemaFilter: ["public"],
  tablesFilter: ["*"],
  breakpoints: true,
  strict: true,
  verbose: true,
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
