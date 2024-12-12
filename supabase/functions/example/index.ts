import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    switch (req.method) {
      case 'GET':
        // Example: Fetch salons
        const { data: salons, error: getError } = await supabaseClient
          .from('salons')
          .select('*')
        
        if (getError) throw getError
        
        return new Response(JSON.stringify({ salons }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        })

      case 'POST':
        // Parse the request body
        const { name, description } = await req.json()
        
        // Example: Create a new salon
        const { data: newSalon, error: postError } = await supabaseClient
          .from('salons')
          .insert({ name, description })
          .select()
          .single()
        
        if (postError) throw postError
        
        return new Response(JSON.stringify({ salon: newSalon }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        })

      default:
        return new Response('Method not allowed', {
          headers: corsHeaders,
          status: 405,
        })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})