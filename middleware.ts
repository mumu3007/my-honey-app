import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request: any) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  return NextResponse.next()
}