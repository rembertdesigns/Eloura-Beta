import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SupportEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: SupportEmailRequest = await req.json();

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Eloura Support <elouraadmin@elouraapp.com>",
      to: [email],
      subject: "We received your message - Eloura Support",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Thank you for contacting Eloura Support!</h1>
          <p>Hi ${name},</p>
          <p>We have received your message and our support team will get back to you within 24 hours.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <p>If you have any urgent concerns, please don't hesitate to reach out to us directly at support@elouraapp.com.</p>
          
          <p>Best regards,<br>The Eloura Support Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            <a href="https://elouraapp.com" style="color: #2754C5;">Eloura</a> - Your family care companion<br>
            Visit our <a href="https://elouraapp.com/help" style="color: #2754C5;">Help Center</a> for instant answers
          </p>
        </div>
      `,
    });

    // Send notification email to support team
    const supportEmailResponse = await resend.emails.send({
      from: "Eloura Support System <elouraadmin@elouraapp.com>",
      to: ["support@elouraapp.com"],
      subject: `New Support Request: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">New Support Request</h1>
          
          <div style="background-color: #f0f9ff; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #2754C5;">
            <h3 style="margin-top: 0; color: #2754C5;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p><a href="mailto:${email}?subject=Re: ${subject}" style="background-color: #2754C5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reply to ${name}</a></p>
        </div>
      `,
    });

    console.log("Support emails sent successfully:", { userEmailResponse, supportEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      userEmailResponse, 
      supportEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-support-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);