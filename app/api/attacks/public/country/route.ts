import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const countries = await prisma.country.groupBy({
      by: ['country', 'countryCode'],
      _sum: {
        count: true,
      },
      where:{
            honeypots: {
                status: "public" // กรองจาก status ของ Honeypots
            },
        },
    });

     const Result = countries.map(country => ({
      country: country.country,
      countryCode: country.countryCode,
      totalCount: country._sum.count,
    }));

    return Response.json(Result)
}