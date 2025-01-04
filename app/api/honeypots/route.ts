import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // ดึงข้อมูล Honeypots พร้อมกับข้อมูลของ User
    const honeypotsWithUser = await prisma.honeypots.findMany({
      include: {
        user: true, // รวมข้อมูลจากตาราง User
      },
    })

    return Response.json(honeypotsWithUser)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name, status, userId } = await req.json()
    const newHoneypots = await prisma.honeypots.create({
      data: {
        name, 
        status, 
        userId 
      },
    })

    return Response.json(newHoneypots)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}