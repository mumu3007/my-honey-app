import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })
    return Response.json({ message: 'User created', newUser })
  } catch (error) {
    return Response.json({ error: 'User could not be created' })
  }
}