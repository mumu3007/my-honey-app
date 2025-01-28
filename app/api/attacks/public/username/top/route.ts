import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topUsername = await prisma.username.groupBy({
      by: ['username'],
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
      take: 8,
    });

    return Response.json(topUsername);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
