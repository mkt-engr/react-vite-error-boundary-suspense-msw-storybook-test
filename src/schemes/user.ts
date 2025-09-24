import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nonnegative(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  maidenName: z.string().nonempty(),
  age: z.number().nonnegative(),
  gender: z.enum(["female", "male", "other"]),
  email: z.email(),
  image: z.httpUrl(),
});

export type User = z.infer<typeof userSchema>;
