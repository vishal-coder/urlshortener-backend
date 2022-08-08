import { nanoid } from "nanoid";

export async function generateShortCode() {
  return await nanoid(7);
}
