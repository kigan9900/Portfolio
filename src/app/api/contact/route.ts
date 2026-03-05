import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // In production, integrate with an email service like Resend, SendGrid, etc.
    // For now, log the message
    console.log('📧 New contact form submission:')
    console.log(`   From: ${name} (${email})`)
    console.log(`   Message: ${message}`)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
