import { timestamps } from "@mapstudio/server/utils/helpers/columns.helpers";
import { date, jsonb, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const sexEnum = pgEnum("sex", ["Male", "Female"]);

export const applicants = pgTable("applicants", {
  applicantId: uuid().primaryKey().defaultRandom(),
  name: jsonb().notNull(),
  contactNumber: varchar().notNull(),
  address: text().notNull(),
  email: varchar({ length: 255 }).notNull(),
  birthDate: date().notNull(),
  sex: sexEnum().notNull(),
  ...timestamps,
});
