import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}
// || new PrismaClient()
const client = globalThis.prisma 
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
