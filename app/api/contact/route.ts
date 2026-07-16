import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    // Validate fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // 1) Send the contact message to OneLap Studio's inbox
    await transporter.sendMail({
      from: `"OneLap Studio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `🚀 New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a1a, #0a0a0a); padding: 32px; text-align: center; border-bottom: 1px solid #222;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
              ⚡ New Project Inquiry
            </h1>
            <p style="color: #888; margin: 8px 0 0; font-size: 14px;">Someone wants to work with OneLap Studio</p>
          </div>
          
          <!-- Body -->
          <div style="padding: 32px;">
            <!-- Sender Info -->
            <div style="background: #111; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #1a1a1a;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px; width: 80px; vertical-align: top;">Name</td>
                  <td style="padding: 8px 0; color: #fff; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 13px; vertical-align: top;">Email</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #60a5fa; font-size: 14px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Message -->
            <div style="background: #111; border-radius: 12px; padding: 20px; border: 1px solid #1a1a1a;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Message</p>
              <p style="color: #ddd; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 20px 32px; text-align: center; border-top: 1px solid #222;">
            <p style="color: #555; font-size: 12px; margin: 0;">
              Sent from OneLap Studio Contact Form • ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
            </p>
          </div>
        </div>
      `,
    })

    // 2) Send auto-reply to the sender
    await transporter.sendMail({
      from: `"OneLap Studio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🎉 — OneLap Studio`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a1a, #0a0a0a); padding: 40px 32px; text-align: center; border-bottom: 1px solid #222;">
            <div style="width: 60px; height: 60px; background: #fff; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 28px; font-weight: 800; color: #000; line-height: 60px;">O</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">
              Thanks for contacting us!
            </h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 32px;">
            <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Hi <strong style="color: #fff;">${name}</strong>,
            </p>
            <p style="color: #aaa; font-size: 14px; line-height: 1.8; margin: 0 0 20px;">
              We've received your message and appreciate you reaching out to OneLap Studio. 
              Our team will review your inquiry and get back to you within <strong style="color: #fff;">24 hours</strong>.
            </p>
            
            <!-- What they sent -->
            <div style="background: #111; border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 3px solid #333;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Your message</p>
              <p style="color: #999; font-size: 13px; line-height: 1.7; margin: 0; font-style: italic; white-space: pre-wrap;">"${message}"</p>
            </div>
            
            <p style="color: #aaa; font-size: 14px; line-height: 1.8; margin: 0 0 24px;">
              In the meantime, feel free to check out our work or follow us on social media:
            </p>
            
            <!-- Social Links -->
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://instagram.com/onelap_studio" style="display: inline-block; padding: 10px 24px; background: #1a1a1a; color: #fff; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; border: 1px solid #333;">
                📸 Follow us on Instagram
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px 32px; text-align: center; border-top: 1px solid #222; background: #050505;">
            <p style="color: #666; font-size: 13px; margin: 0 0 4px; font-weight: 600;">OneLap Studio</p>
            <p style="color: #444; font-size: 12px; margin: 0;">Building digital products that matter.</p>
            <p style="color: #333; font-size: 11px; margin: 12px 0 0;">
              📧 onelapstudio7@gmail.com &nbsp;•&nbsp; 📱 +91 9360893246
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
