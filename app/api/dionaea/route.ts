import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  return Response.json(await prisma.dionaea.findMany())
}

export async function POST(req: Request) {
  try {
    const { attacks } = await req.json()
    const newPost = await prisma.dionaea.create({
      data: {
        attacks
      },
    })
    return Response.json(newPost)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}