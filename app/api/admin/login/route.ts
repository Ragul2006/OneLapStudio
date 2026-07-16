import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const expectedEmail = (process.env.ADMIN_EMAIL || 'onelapstudio7@gmail.com').trim().toLowerCase()
    const expectedPassword = process.env.ADMIN_PASSWORD || 'OneLapStudio@0610'

    if (
      email?.trim().toLowerCase() === expectedEmail &&
      password === expectedPassword
    ) {
      return NextResponse.json({
        success: true,
        user: {
          email: expectedEmail,
          name: 'OneLap Lead Admin',
          role: 'SUPER_ADMIN',
        },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password.' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed.' },
      { status: 500 }
    )
  }
}
