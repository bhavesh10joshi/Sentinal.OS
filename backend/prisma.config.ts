import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

export default defineConfig({
  // Tells Prisma CLI exactly where your static models live
  schema: "prisma/schema.prisma", 
  
  // 🌟 Enforces the runtime connection environment right here!
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});