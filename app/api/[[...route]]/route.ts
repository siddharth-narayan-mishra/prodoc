import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
import auth from "@/features/auth/server/route"
const app = new Hono().basePath("/api");

export const routes = app.route("/auth",auth)

export type AppType = typeof routes

export const GET = handle(app);
export const POST = handle(app);