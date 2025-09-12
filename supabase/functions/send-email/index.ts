import React from 'npm:react@18.3.1'
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { MagicLinkEmail } from './_templates/magic-link.tsx'
import { WelcomeEmail } from './_templates/welcome-email.tsx'
import { PasswordResetEmail } from './_templates/password-reset.tsx'
import { VillageInvitationEmail } from './_templates/village-invitation.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
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
    
    // Handle webhook verification if secret is provided
    if (hookSecret) {
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

      const { error } = await resend.emails.send({
        from: 'Eloura <elouraadmin@elouraapp.com>',
        to: [user.email],
        subject: 'Sign in to Eloura',
        html,
      })

      if (error) {
        throw error
      }
    } else {
      // Handle direct API calls (for welcome emails, etc.)
      const { type, email, data } = await req.json()
      
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
          
        default:
          return new Response(
            JSON.stringify({ error: 'Invalid email type' }),
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json', ...corsHeaders }
            }
          )
      }

      const { error } = await resend.emails.send({
        from: 'Eloura <elouraadmin@elouraapp.com>',
        to: [email],
        subject,
        html,
      })

      if (error) {
        throw error
      }
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