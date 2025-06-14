import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const MODEL = "gpt-4.1";
