import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    return Response.json(await prisma.honeypots.delete({
      where: { id: Number(params.id) },
    }))
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}