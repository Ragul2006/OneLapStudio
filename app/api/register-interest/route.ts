import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, description, projectTitle } = await req.json()

    if (!name || !email || !description || !projectTitle) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL } = process.env

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !ADMIN_EMAIL) {
      console.error('Gmail Environment variables are missing.')
      return NextResponse.json(
        { error: 'Email service is not configured properly.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    })

    const submittedAt = new Date().toLocaleString()

    // Email to Admin
    const adminMailOptions = {
      from: `"OneLap Studio" <${GMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Project Interest - ${projectTitle}`,
      text: `Project: ${projectTitle}

Name:
${name}

Email:
${email}

Description:
${description}

Submitted At:
${submittedAt}`,
    }

    // Email to User
    const userMailOptions = {
      from: `"OneLap Studio" <${GMAIL_USER}>`,
      to: email,
      subject: `Thanks for your interest in ${projectTitle}`,
      text: `Hi ${name},

Thank you for registering your interest in ${projectTitle}.

We have received your request successfully. Our team will review your message and get back to you as soon as possible.

Your submitted details:

Project:
${projectTitle}

Description:
${description}

Regards,
OneLap Studio`,
    }

    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    return NextResponse.json(
      { message: 'Interest registered successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
