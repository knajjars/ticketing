export const JWT_KEY = process.env.JWT_KEY as string
export const NODE_ENV = process.env.NODE_ENV as string

if (typeof JWT_KEY === 'undefined') {
  throw new Error("Missing env variable 'JWT_KEY'")
}

if (typeof NODE_ENV === 'undefined') {
  throw new Error("Missing env variable 'NODE_ENV'")
}
