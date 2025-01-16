import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { login, logOut, signup } from "../actions";

const app = new Hono()
  .post(
    "/login",
    zValidator(
      "json",
      z.object({ email: z.string().email(), password: z.string() })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");
      await login({ email, password });
      return c.json({ success: "true" });
    }
  )
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      })
    ),
    async (c) => {
      const { email, password, name } = c.req.valid("json");
      await signup({ email, password, name });
      return c.json({ success: "true" });
    }
  )
  .post(
    "/verify",
    zValidator(
      "json",
      z.object({ email: z.string().email(), password: z.string() })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");
      await login({ email, password });
    }
  )
  .post("/logout", async (c) => {
    await logOut();
    return c.json({ success: "true" });
  });

export default app;
