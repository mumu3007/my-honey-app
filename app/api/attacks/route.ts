import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'

const prisma = new PrismaClient()

export async function GET() {
   try {
    // ดึงข้อมูล Honeypots พร้อมกับข้อมูลของ User
    const attacksWithHoneypots = await prisma.attacks.findMany({
      include: {
        honeypots: {
          include: {
            user: true, // ดึงข้อมูลของ user จาก Honeypots
          },
        },
      },
    })

    return Response.json(attacksWithHoneypots)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const { name, alert, ip_attacker,protocol,
            comment, username, password, destinationPort, honeypotId } = await req.json()
    const newAttacks = await prisma.attacks.create({
      data: {
        name, 
        alert, 
        ip_attacker,
        protocol,
        comment: comment=="" ? "-":comment, 
        username, 
        password,
        destinationPort,
        honeypotId
      },
    })

    const existingProtocol = await prisma.protocol.findFirst({
      where: {
        name: protocol,
        honeypotId: honeypotId
      },
    });

    if (existingProtocol) {
      await prisma.protocol.update({
        where: { id: existingProtocol.id, honeypotId: honeypotId },
        data: { count: existingProtocol.count + 1 },
      });
    } else {
      await prisma.protocol.create({
        data: {
          name: protocol,
          count: 1,
          honeypotId: honeypotId
        },
      });
    }

    const existingUsername = await prisma.username.findFirst({
      where: {
        username: username,
        honeypotId: honeypotId
      },
    });

    if (existingUsername) {
      await prisma.username.update({
        where: { id: existingUsername.id, honeypotId: honeypotId },
        data: { count: existingUsername.count + 1 },
      });
    } else {
      await prisma.username.create({
        data: {
          username: username,
          count: 1,
          honeypotId: honeypotId
        },
      });
    }

    const existingPassword = await prisma.password.findFirst({
      where: {
        password: password,
        honeypotId: honeypotId
      },
    });

    if (existingPassword) {
      await prisma.password.update({
        where: { id: existingPassword.id, honeypotId: honeypotId },
        data: { count: existingPassword.count + 1 },
      });
    } else {
      await prisma.password.create({
        data: {
          password: password,
          count: 1,
          honeypotId: honeypotId
        },
      });
    }

    const countryResponse = await fetch(`http://ip-api.com/json/${ip_attacker}`);
    const countryData = await countryResponse.json();
    const existingIP = await prisma.country.findFirst({
      where: {
        ip_attacker: ip_attacker,
        honeypotId: honeypotId
      },
    });

    if (existingIP) {
      await prisma.country.update({
        where: { id: existingIP.id, honeypotId: honeypotId },
        data: { count: existingIP.count + 1 },
      });
    } else {
      await prisma.country.create({
        data: {
          ip_attacker: ip_attacker,
          country: countryData.country,
          countryCode: countryData.countryCode,
          count: 1,
          honeypotId: honeypotId
        },
      });
    }

    const existingPort = await prisma.port.findFirst({
      where: {
        destinationPort: destinationPort,
        honeypotId: honeypotId
      },
    });

    if (existingPort) {
      await prisma.port.update({
        where: { id: existingPort.id, honeypotId: honeypotId },
        data: { count: existingPort.count + 1 },
      });
    } else {
      await prisma.port.create({
        data: {
          destinationPort: destinationPort,
          count: 1,
          honeypotId: honeypotId
        },
      });
    }


    return Response.json(newAttacks)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}