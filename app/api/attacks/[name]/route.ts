import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
    const honeypotName = params.name
    const post = await prisma.attacks.findMany({
        where:{
            name: honeypotName
        }
    })
    return Response.json(post)
}