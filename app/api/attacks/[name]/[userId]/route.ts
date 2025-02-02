import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { name: string, userId: number } }
) {
    const { name, userId }= await params

    const attacks = await prisma.attacks.findMany({
        where:{
            name: name,
            honeypots: {
                userId: Number(userId) // กรองจาก status ของ Honeypots
            },
        },
        include: {
            honeypots: true, // ดึงข้อมูล Honeypots ด้วยถ้าต้องการ
        },
    })
    return Response.json(attacks)
}
