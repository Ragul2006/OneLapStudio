import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    const { IMGBB_API_KEY } = process.env

    if (!IMGBB_API_KEY || IMGBB_API_KEY === 'your_imgbb_api_key_here') {
      console.error('ImgBB API key is missing.')
      return NextResponse.json(
        { error: 'Image hosting is not configured. Please add IMGBB_API_KEY.' },
        { status: 500 }
      )
    }

    // Convert file to base64 for ImgBB
    const buffer = await file.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString('base64')

    const imgbbFormData = new URLSearchParams()
    imgbbFormData.append('key', IMGBB_API_KEY)
    imgbbFormData.append('image', base64Image)

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      console.error('ImgBB upload error:', data)
      throw new Error(data.error?.message || 'Failed to upload image to ImgBB.')
    }

    return NextResponse.json({ url: data.data.url }, { status: 200 })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
