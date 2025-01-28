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
      take: 4,
    });

    const excludedUsername = topUsername.map(username => username.username);

    const others = await prisma.username.groupBy({
      by: ['username'],
      _sum: {
        count: true,
      },
      where: {
        username: {
          notIn: excludedUsername,
        },
        honeypots: {
            status: "public"  // กรองจาก status ของ Honeypots
        },
      },
    });

    const othersTotalCount = others.reduce((sum, username) => sum + (username._sum.count || 0), 0);

    const Result = topUsername.map(username => ({
      username: username.username,
      totalCount: username._sum.count,
    }));

    Result.push({
        username: "others",
        totalCount: othersTotalCount,
    })

    return Response.json(Result);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
