import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: number } }) {
    const userId = params.userId
  try {
    const topProtocols = await prisma.password.findMany({
      orderBy: {
        count: 'desc',
      },
      where:{
            honeypots: {
                userId: Number(userId) // กรองจาก status ของ Honeypots
            },
        },
      take: 8,
    });

    return Response.json(topProtocols);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
