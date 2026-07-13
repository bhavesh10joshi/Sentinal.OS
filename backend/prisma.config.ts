import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL, // 🌟 Keeps Prisma 7 quiet
  },
});