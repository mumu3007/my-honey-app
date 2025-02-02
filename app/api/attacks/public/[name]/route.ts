import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
    const { name }= await params
    const attacks = await prisma.attacks.findMany({
      where:{
        name: name,
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