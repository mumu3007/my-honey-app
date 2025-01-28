import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
     const topProtocol = await prisma.protocol.groupBy({
      by: ['name'],
      _sum: {
        count: true,
      },
      where:{
            honeypots: {
                status: "public" // กรองจาก status ของ Honeypots
            },
        },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
      take: 4,
    });
    return Response.json(topProtocol)
}
