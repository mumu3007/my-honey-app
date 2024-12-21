import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
    const honeypotName = params.name
    const post = await prisma.honeypot.findMany({
        where:{
            name: honeypotName
        }
    })
    return Response.json(post)
}

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   try{
//     const { title, content } = await req.json()
//     const postId = Number(params.id)

//     const updatePost = await prisma.post.update({
//           where:{
//               id: postId
//           },
//           data: {
//             title,
//             content
//           }
//     })

//     return Response.json(updatePost)
//   }
//   catch(error){
//     return new Response(error as BodyInit, {
//       status: 500,
//     })
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } },
// ) {
//   try{
//     const postId = Number(params.id)
//     const deletePost = await prisma.post.delete({
//         where:{
//             id: postId
//         } 
//     })
//     return Response.json(deletePost)
//   }
//   catch(error){
//     return new Response(error as BodyInit, {
//       status: 500,
//     })
//   }
// }