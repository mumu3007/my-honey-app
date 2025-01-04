import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const post = await prisma.protocol.findMany()
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

// export async function POST(req: Request) {
//   try {
//     const { name, count } = await req.json()
//     const counts = Number(count)
//     // const existingProtocol = await prisma.protocol.findFirst({
//     //   where: {
//     //     name: protocol
//     //   },
//     // });

//     // if (existingProtocol) {
//     //   // หากมีแล้ว เพิ่ม count + 1
//     //   const newProtocol = await prisma.protocol.update({
//     //     where: { id: existingProtocol.id },
//     //     data: { count: existingProtocol.count + 1 },
//     //   });
//     //   return Response.json(newProtocol)
//     // } else {
//       // หากไม่มี สร้างใหม่
//       const newProtocol = await prisma.protocol.create({
//         data: {
//           name: name,
//           count: counts,
//         },
//       });
//       return Response.json(newProtocol)
//     // }
//   } catch (error) {
//     return new Response(error as BodyInit, {
//       status: 500,
//     })
//   }
// }