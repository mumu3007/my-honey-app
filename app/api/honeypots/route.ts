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

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json()

    // ตรวจสอบว่า honeypot ที่ต้องการอัปเดตมีอยู่หรือไม่
    const existingHoneypot = await prisma.honeypots.findUnique({
      where: { id },
    })

    if (!existingHoneypot) {
      return new Response(JSON.stringify({ error: 'Honeypot not found' }), {
        status: 404,
      })
    }

    // อัปเดตสถานะของ honeypot
    const updatedHoneypot = await prisma.honeypots.update({
      where: { id },
      data: { status },
    })

    return Response.json(updatedHoneypot)
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    // ตรวจสอบว่า honeypot ที่ต้องการลบมีอยู่หรือไม่
    const existingHoneypot = await prisma.honeypots.findUnique({
      where: { id },
    })

    if (!existingHoneypot) {
      return new Response(JSON.stringify({ error: 'Honeypot not found' }), {
        status: 404,
      })
    }

    // ลบ honeypot
    await prisma.honeypots.delete({
      where: { id },
    })

    return new Response(JSON.stringify({ message: 'Honeypot deleted successfully' }), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
