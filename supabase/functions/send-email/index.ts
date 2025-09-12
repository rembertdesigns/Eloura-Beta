import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { MagicLinkEmail } from './_templates/magic-link.tsx'
import { WelcomeEmail } from './_templates/welcome-email.tsx'
import { PasswordResetEmail } from './_templates/password-reset.tsx'
import { VillageInvitationEmail } from './_templates/village-invitation.tsx'
import { ChangeEmailEmail } from './_templates/change-email.tsx'
import { ReauthenticationEmail } from './_templates/reauthentication.tsx'

// Initialize SMTP client with Gmail configuration
const client = new SMTPClient({
  connection: {
    hostname: 'smtp.gmail.com',
    port: 587,
    tls: true,
    auth: {
      username: Deno.env.get('GMAIL_USERNAME') as string,
      password: Deno.env.get('GMAIL_APP_PASSWORD') as string,
    },
  },
})

const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

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

      await client.send({
        from: 'Eloura Support <elouraadmin@elouraapp.com>',
        to: user.email,
        subject: 'Sign in to Eloura',
        html,
      })
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

      await client.send({
        from: 'Eloura Support <elouraadmin@elouraapp.com>',
        to: email,
        subject,
        html,
      })
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