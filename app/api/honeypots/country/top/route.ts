import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topCountries = await prisma.country.groupBy({
      by: ['country'],
      _sum: {
        count: true,
      },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
      take: 5,
    });

    const excludedCountries = topCountries.map(country => country.country);

    const others = await prisma.country.groupBy({
      by: ['country'],
      _sum: {
        count: true,
      },
      where: {
        country: {
          notIn: excludedCountries,
        },
      },
    });

    const othersTotalCount = others.reduce((sum, country) => sum + (country._sum.count || 0), 0);

    const Result = topCountries.map(country => ({
      country: country.country,
      totalCount: country._sum.count,
    }));

    Result.push({
        country: "others",
        totalCount: othersTotalCount,
    })

    return Response.json(Result);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
