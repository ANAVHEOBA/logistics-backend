import nodemailer from 'nodemailer';

const test = {
  name: 'Gmail SMTP',
  config: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'gofromazafrica@gmail.com',
      pass: 'gskm mpin oxcy eoth'
    },
    // Gmail specific settings
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
    tls: {
      rejectUnauthorized: true
    },
    // Add DKIM configuration (Gmail handles this automatically)
    dkim: {
      domainName: "gmail.com",
      keySelector: "default",
      privateKey: "" // Gmail handles DKIM signing automatically
    }
  }
};

const recipient = 'wisdomvolt@gmail.com';

async function testTransport(test: any, retries = 2): Promise<boolean> {
  const { name, config } = test;
  console.log(`\nTesting Gmail SMTP configuration...`);
  
  try {
    const transporter = nodemailer.createTransport(config);

    // Verify connection
    await transporter.verify();
    console.log('✓ Gmail SMTP connection verified');

    const info = await transporter.sendMail({
      from: {
        name: 'GoFromA2Z Africa Logistics',
        address: config.auth.user
      },
      replyTo: config.auth.user,
      to: recipient,
      subject: '🚚 Test Email from GoFromA2Z Africa Logistics',
      text: 'This is a test email from your logistics system.',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GoFromA2Z Africa Test Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
            <div style="background-color: #000000; color: #FFD700; padding: 20px; text-align: center; border-radius: 5px; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px;">GoFromA2Z Africa Logistics</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff; border: 1px solid #FFD700; border-radius: 5px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Test Email Verification</h2>
              <p style="color: #555;">Dear valued customer,</p>
              <p style="color: #555;">This is a test email from your logistics system to verify email delivery configuration.</p>
              <p style="color: #555;">If you received this email in your inbox, your email configuration is working correctly.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://gofroma2zafrica.com" style="background-color: #FFD700; color: #000000; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>This is an automated message, please do not reply directly to this email.</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} GoFromA2Z Africa Logistics. All rights reserved.</p>
              <p style="margin: 5px 0;">Contact us: <a href="mailto:${config.auth.user}" style="color: #FFD700;">${config.auth.user}</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      headers: {
        'X-Priority': '1',
        'Importance': 'high',
        'X-MSMail-Priority': 'High',
        'X-Mailer': 'GoFromA2Z Logistics Mailer',
        'List-Unsubscribe': `<mailto:${config.auth.user}?subject=unsubscribe>`,
        'Feedback-ID': 'TEST:GoFromA2Z:gmail',
        'X-Entity-Ref-ID': new Date().getTime().toString(),
        'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(2)}@gmail.com>`,
        'X-Report-Abuse': `Please report abuse here: ${config.auth.user}`,
        'X-Auto-Response-Suppress': 'OOF, AutoReply'
      },
      messageId: `<${Date.now()}-${Math.random().toString(36).substring(2)}@gmail.com>`,
      priority: 'high'
    });

    console.log(`\n✅ Success! Email sent`);
    console.log(`Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('\n❌ Error:', (error as Error).message);
    return false;
  }
}

(async () => {
  console.log('Starting email test...');
  await testTransport(test);
})();