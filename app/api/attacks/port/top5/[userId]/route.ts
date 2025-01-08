import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: number } }) {
  const userId = params.userId
  try {
    const topPort = await prisma.port.groupBy({
      by: ['destinationPort'],
      _sum: {
        count: true,
      },
      where:{
            honeypots: {
                userId: Number(userId) // กรองจาก status ของ Honeypots
            },
        },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
      take: 4,
    });

    const excludedPort = topPort.map(port => port.destinationPort);

    const others = await prisma.port.groupBy({
      by: ['destinationPort'],
      _sum: {
        count: true,
      },
      where: {
        destinationPort: {
          notIn: excludedPort,
        },
        honeypots: {
            userId: Number(userId) // กรองจาก status ของ Honeypots
        },
      },
    });

    const othersTotalCount = others.reduce((sum, destinationPort) => sum + (destinationPort._sum.count || 0), 0);

    const Result = topPort.map(port => ({
      destinationPort: port.destinationPort,
      totalCount: port._sum.count,
    }));

    Result.push({
        destinationPort: "others",
        totalCount: othersTotalCount,
    })

    return Response.json(Result);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
