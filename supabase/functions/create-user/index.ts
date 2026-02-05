import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify the caller is an admin
    console.log('Extracting Authorization header...');
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      console.error('Missing Authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('Parsing Bearer token...');
    const token = authHeader.replace('Bearer ', '');
    
    console.log('Getting authenticated user with token...');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError) {
      console.error('Auth error:', userError);
      return new Response(
        JSON.stringify({ error: 'Authentication failed', details: userError.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    if (!user) {
      console.error('No user found in auth header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - no user found' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('User authenticated:', user.id);

    console.log('Checking admin role...');
    const { data: hasAdminRole, error: roleError } = await supabaseClient.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    })

    if (roleError) {
      console.error('Role check error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Role verification failed', details: roleError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!hasAdminRole) {
      console.error('User is not an admin:', user.id);
      return new Response(
        JSON.stringify({ error: 'Only admins can create users' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('Admin verified, creating user...');

    const { email, password, fullName, role } = await req.json()
    console.log('Creating user with email:', email);

    // Create user with admin privileges
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return new Response(
        JSON.stringify({ error: createError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('User created successfully:', newUser.user?.id);

    // Assign role if admin
    if (role === 'admin' && newUser.user) {
      console.log('Assigning admin role to user:', newUser.user.id);
      const { error: roleInsertError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: newUser.user.id,
          role: 'admin',
        })

      if (roleInsertError) {
        console.error('Error assigning admin role:', roleInsertError)
      } else {
        console.log('Admin role assigned successfully');
      }
    }

    console.log('User creation process completed successfully');
    return new Response(
      JSON.stringify({ success: true, user: newUser.user }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Unexpected error in create-user function:', error)
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
