import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: {userId: number } }
) {
    const { userId }= await params

    const attacks = await prisma.honeypots.findMany({
        where:{
                userId: Number(userId) // กรองจาก status ของ Honeypots
        },
        include: {
            user: true, // ดึงข้อมูล Honeypots ด้วยถ้าต้องการ
        },
         orderBy: {
            id: 'asc', // เรียงตาม id จากน้อยไปหามาก
        }
    })
    return Response.json(attacks)
}
