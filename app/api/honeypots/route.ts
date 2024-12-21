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
    return Response.json(newHoneypot)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}