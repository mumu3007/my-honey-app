import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: number } }) {
    const userId = params.userId
  try {
    const topCountries = await prisma.country.groupBy({
      by: ['country', 'countryCode'],
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

    const excludedCountries = topCountries.map(country => country.country);

    const others = await prisma.country.groupBy({
      by: ['country', 'countryCode'],
      _sum: {
        count: true,
      },
      where: {
        country: {
          notIn: excludedCountries,
        },
        honeypots: {
            userId: Number(userId) // กรองจาก status ของ Honeypots
        },
      },
    });

    const othersTotalCount = others.reduce((sum, country) => sum + (country._sum.count || 0), 0);

    const Result = topCountries.map(country => ({
      country: country.country,
      countryCode: country.countryCode,
      totalCount: country._sum.count,
    }));

    Result.push({
        country: "others",
        countryCode: "others",
        totalCount: othersTotalCount,
    })

    return Response.json(Result);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
