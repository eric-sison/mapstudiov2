import { z } from "zod";

export const ApplicantSchema = z.object({
  name: z.object({
    firstName: z.string().min(1),
    middleName: z.string(),
    lastName: z.string().min(1),
  }),
  contactNumber: z.string(),
  address: z.string(),
  email: z.string(),
  birthDate: z.string().date(),
  sex: z.enum(["Male", "Female"]),
});
