export const JWT_KEY = process.env.JWT_KEY as string;

if (typeof JWT_KEY === "undefined") {
  throw new Error("Missing env variable 'JWT_KEY'");
}
