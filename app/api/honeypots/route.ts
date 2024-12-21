import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  return Response.json(await prisma.honeypot.findMany())
}

export async function POST(req: Request) {
  try {
    const { name, alert, ip_attacker,protocol,
            comment, username, password, } = await req.json()
    const newHoneypot = await prisma.honeypot.create({
      data: {
        name, 
        alert, 
        ip_attacker,
        protocol,
        comment, 
        username, 
        password,
      },
    })

    const existingProtocol = await prisma.protocol.findFirst({
      where: {
        name: protocol
      },
    });

    if (existingProtocol) {
      // หากมีแล้ว เพิ่ม count + 1
      await prisma.protocol.update({
        where: { id: existingProtocol.id },
        data: { count: existingProtocol.count + 1 },
      });
    } else {
      // หากไม่มี สร้างใหม่
      await prisma.protocol.create({
        data: {
          name: protocol,
          count: 1,
        },
      });
    }

    return Response.json(newHoneypot)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}