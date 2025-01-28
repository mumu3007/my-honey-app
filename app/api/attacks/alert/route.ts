import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    // const honeypotAlert = params.alert
    const post = await prisma.attacks.findMany()

    return Response.json(post)
}
