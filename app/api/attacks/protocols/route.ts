import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const post = await prisma.protocol.findMany()
    return Response.json(post)
}
