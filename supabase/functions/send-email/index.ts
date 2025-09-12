import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { MagicLinkEmail } from './_templates/magic-link.tsx'
import { WelcomeEmail } from './_templates/welcome-email.tsx'
import { PasswordResetEmail } from './_templates/password-reset.tsx'
import { VillageInvitationEmail } from './_templates/village-invitation.tsx'
import { ChangeEmailEmail } from './_templates/change-email.tsx'
import { ReauthenticationEmail } from './_templates/reauthentication.tsx'

// Gmail API configuration
const gmail = {
  clientId: Deno.env.get('GMAIL_CLIENT_ID'),
  clientSecret: Deno.env.get('GMAIL_CLIENT_SECRET'),
  refreshToken: Deno.env.get('GMAIL_REFRESH_TOKEN'),
  fromEmail: Deno.env.get('GMAIL_FROM_EMAIL') || 'elouraadmin@elouraapp.com'
}

const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

// Function to get Gmail access token
async function getGmailAccessToken() {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: gmail.clientId!,
      client_secret: gmail.clientSecret!,
      refresh_token: gmail.refreshToken!,
      grant_type: 'refresh_token',
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error('Failed to get Gmail access token')
  }

  const data = await tokenResponse.json()
  return data.access_token
}

// Function to send email via Gmail API
async function sendEmailViaGmail(to: string, subject: string, html: string) {
  try {
    const accessToken = await getGmailAccessToken()
    
    // Create the email message
    const emailMessage = [
      `To: ${to}`,
      `From: Eloura Support <${gmail.fromEmail}>`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      html
    ].join('\n')

    // Base64 encode the message
    const encodedMessage = btoa(emailMessage)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    // Send via Gmail API
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedMessage
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Gmail API error: ${response.status} - ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Gmail API error:', error)
    throw error
  }
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    })
  }

  try {
    const payload = await req.text()
    const headers = Object.fromEntries(req.headers)
    
    // Try to parse as JSON first for direct API calls
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(payload);
    } catch {
      // Not JSON, likely a webhook
    }
    
    // Handle webhook verification if secret is provided and this looks like a webhook
    if (hookSecret && !parsedPayload) {
      const wh = new Webhook(hookSecret)
      const {
        user,
        email_data: { token, token_hash, redirect_to, email_action_type },
      } = wh.verify(payload, headers) as {
        user: {
          email: string
        }
        email_data: {
          token: string
          token_hash: string
          redirect_to: string
          email_action_type: string
          site_url: string
          token_new: string
          token_hash_new: string
        }
      }

      // Generate magic link email
      const html = await renderAsync(
        React.createElement(MagicLinkEmail, {
          supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
          token,
          token_hash,
          redirect_to: redirect_to || 'https://elouraapp.com/dashboard',
          email_action_type,
        })
      )

      await sendEmailViaGmail(user.email, 'Sign in to Eloura', html)
    } else {
      // Handle direct API calls (for welcome emails, etc.)
      const { type, email, data } = parsedPayload || JSON.parse(payload)
      
      let html: string
      let subject: string
      
      switch (type) {
        case 'welcome':
          html = await renderAsync(
            React.createElement(WelcomeEmail, {
              userName: data.userName || 'there',
              loginUrl: data.loginUrl || 'https://elouraapp.com/auth',
            })
          )
          subject = 'Welcome to Eloura!'
          break
          
        case 'password-reset':
          html = await renderAsync(
            React.createElement(PasswordResetEmail, {
              userName: data.userName || 'there',
              resetUrl: data.resetUrl,
            })
          )
          subject = 'Reset your Eloura password'
          break
          
        case 'village-invitation':
          html = await renderAsync(
            React.createElement(VillageInvitationEmail, {
              invitedName: data.invitedName || 'there',
              inviterName: data.inviterName || 'someone',
              inviterEmail: data.inviterEmail || '',
              role: data.role || 'support member',
              personalMessage: data.personalMessage || '',
              signupUrl: data.signupUrl || 'https://elouraapp.com/auth',
            })
          )
          subject = `${data.inviterName} invited you to join their Eloura village`
          break
          
        case 'change-email':
          html = await renderAsync(
            React.createElement(ChangeEmailEmail, {
              userName: data.userName || 'there',
              newEmail: data.newEmail || '',
              confirmUrl: data.confirmUrl || '',
            })
          )
          subject = 'Confirm your new email address for Eloura'
          break
          
        case 'reauthentication':
          html = await renderAsync(
            React.createElement(ReauthenticationEmail, {
              userName: data.userName || 'there',
              verificationCode: data.verificationCode || '',
              actionDescription: data.actionDescription || 'complete this action',
            })
          )
          subject = 'Your Eloura Verification Code'
          break
          
        default:
          return new Response(
            JSON.stringify({ error: 'Invalid email type' }),
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            }
          )
      }

      await sendEmailViaGmail(email, subject, html)
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('Error in send-email function:', error)
    return new Response(
      JSON.stringify({
        error: {
          message: error.message,
        },
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})