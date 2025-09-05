import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the user from the request
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, sessionId } = await req.json();
    console.log('Received message:', message, 'for session:', sessionId);

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Save user message to database
    const { error: saveUserMessageError } = await supabaseClient
      .from('chat_messages')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        message_content: message,
        sender: 'user'
      });

    if (saveUserMessageError) {
      console.error('Error saving user message:', saveUserMessageError);
      throw saveUserMessageError;
    }

    // Get recent conversation history for context
    const { data: recentMessages } = await supabaseClient
      .from('chat_messages')
      .select('message_content, sender')
      .eq('user_id', user.id)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Prepare messages for OpenAI API
    const messages = [
      {
        role: 'system',
        content: `You are Eloura, a caring and knowledgeable AI assistant designed to help busy parents, caregivers, and goal-achievers navigate their complex lives. Your role is to provide personalized guidance on managing family responsibilities, caregiving duties, personal goals, and daily challenges.

Key characteristics:
- Empathetic and understanding of the mental load caregivers carry
- Practical and actionable in your advice
- Supportive without being overwhelming
- Knowledgeable about family management, eldercare, childcare, and personal development
- Able to help with planning, organization, delegation, and stress management

Always acknowledge the user's efforts and validate their experiences. Provide concrete, achievable suggestions that fit into busy schedules. When appropriate, encourage self-care and remind users that asking for help is a strength.`
      },
      ...(recentMessages || []).slice(-8).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.message_content
      }))
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    console.log('Generated response:', assistantMessage);

    // Save assistant message to database
    const { error: saveAssistantMessageError } = await supabaseClient
      .from('chat_messages')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        message_content: assistantMessage,
        sender: 'assistant'
      });

    if (saveAssistantMessageError) {
      console.error('Error saving assistant message:', saveAssistantMessageError);
      throw saveAssistantMessageError;
    }

    return new Response(JSON.stringify({ 
      response: assistantMessage,
      usage: data.usage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});