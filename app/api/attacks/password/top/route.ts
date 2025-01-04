import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topProtocols = await prisma.password.findMany({
      orderBy: {
        count: 'desc',
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
