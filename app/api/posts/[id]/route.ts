import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    const postId = Number(params.id)
    const post = await prisma.post.findUnique({
        where:{
            id: postId
        }
    })

    return Response.json(post)
//   return Response.json(await prisma.post.findUnique({
//     where: { id: Number(params.id) },
//   }))
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try{
    const { title, content } = await req.json()
    const postId = Number(params.id)

    const updatePost = await prisma.post.update({
          where:{
              id: postId
          },
          data: {
            title,
            content
          }
    })

    return Response.json(updatePost)
  }
  catch(error){
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try{
    const postId = Number(params.id)
    const deletePost = await prisma.post.delete({
        where:{
            id: postId
        } 
    })
    return Response.json(deletePost)
  }
  catch(error){
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}