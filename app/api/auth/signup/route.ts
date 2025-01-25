import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name, image } = await req.json()
    const hashedPassword = bcrypt.hashSync(password, 10)

    const checkEmail = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    const checkName = await prisma.user.findFirst({
        where:{
            name: name
        }
    })
    
    if(checkEmail){
      return new Response(
        JSON.stringify({ error: 'This Email is already registered' }),
        { status: 409 }
      )
    }
    if(checkName){
      return new Response(
        JSON.stringify({ error: 'This name is already taken' }),
        { status: 409 }
      )
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        image,
      },
    })
    return Response.json({ message: 'User created', newUser })
  } catch (error) {
    return Response.json({ error: 'User could not be created' })
  }
}