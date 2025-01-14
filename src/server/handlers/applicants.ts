import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "../db/postgres";
import { applicants } from "../db/schemas/schema";
import { ApplicantSchema } from "../validators/applicant.schema";

export const applicantsHandler = new Hono()
  .get("/", async (c) => {
    try {
      const { page, limit } = c.req.query();
      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 10;

      const result = await db
        .select()
        .from(applicants)
        .limit(limitNum)
        .offset((pageNum - 1) * limitNum);
      return c.json({
        items: result,
      });
    } catch (error) {
      throw error;
    }
  })
  .get("/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const result = await db.select().from(applicants).where(eq(applicants.applicantId, id));

      /* check if result is empty */
      if (result.length === 0) {
        return c.notFound();
      }
      return c.json(result[0]);
    } catch (error) {
      throw error;
    }
  })
  .post("/", zValidator("json", ApplicantSchema), async (c) => {
    try {
      const data = c.req.valid("json");

      const result = await db.insert(applicants).values(data).returning();
      return c.json(result[0]);
    } catch (error) {
      throw error;
    }
  })
  .put("/:id", zValidator("json", ApplicantSchema), async (c) => {
    try {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      const result = await db.update(applicants).set(data).where(eq(applicants.applicantId, id));

      /* check if result is empty */
      if (result.rowCount === 0) {
        return c.notFound();
      }

      return c.json(result);
    } catch (error) {
      throw error;
    }
  })
  .delete("/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const result = await db.delete(applicants).where(eq(applicants.applicantId, id));

      /* check if result is empty */
      if (result.rowCount === 0) {
        return c.notFound();
      }
      return c.json(result);
    } catch (error) {
      throw error;
    }
  });
