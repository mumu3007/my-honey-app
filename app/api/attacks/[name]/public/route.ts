import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
    const honeypotName = params.name
    const attacks = await prisma.attacks.findMany({
        where:{
            name: honeypotName,
            honeypots: {
                status: "public", // กรองจาก status ของ Honeypots
            },
        },
        include: {
        honeypots: {
          include: {
            user: true, // ดึงข้อมูลของ user จาก Honeypots
          },
        },
      },
    })
    return Response.json(attacks)
}