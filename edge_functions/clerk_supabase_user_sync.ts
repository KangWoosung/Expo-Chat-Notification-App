/*
2025-07-20 21:14:05
// clerk_supabase_user_sync.ts

users table
 { user_id, name, email, avatar, push_token }


// Supabase Edge Function for Sync Clerk with Supabase
import { verifyWebhook } from "npm:@clerk/backend/webhooks";
import { createClient } from "npm:@supabase/supabase-js";

Deno.serve(async (req) => {
  // 1. Verify Clerk webhook
  const webhookSecret = Deno.env.get("CLERK_WEBHOOK_SECRET");
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const event = await verifyWebhook(req, { signingSecret: webhookSecret });

  // 2. Create Supabase client
  const supabaseUrl = Deno.env.get("EXPO_PUBLIC_SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response("Supabase credentials not configured", { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  switch (event.type) {
    case "user.created": {
      const clerkUser = event.data;

      const { data: user, error } = await supabase
        .from("users")
        .insert([
          {
            user_id: clerkUser.id, // Clerk user ID
            name: `${clerkUser.first_name ?? ""} ${clerkUser.last_name ?? ""}`.trim(),
            email: clerkUser.email_addresses?.[0]?.email_address ?? "",
            avatar: clerkUser.image_url,
            push_token: null, // or default value
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify({ user }), { status: 200 });
    }

    case "user.updated": {
      const clerkUser = event.data;

      const { data: user, error } = await supabase
        .from("users")
        .update({
          name: `${clerkUser.first_name ?? ""} ${clerkUser.last_name ?? ""}`.trim(),
          email: clerkUser.email_addresses?.[0]?.email_address ?? "",
          avatar: clerkUser.image_url,
        })
        .eq("user_id", clerkUser.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify({ user }), { status: 200 });
    }

    default: {
      // Other event types can be added as needed
      console.log("Unhandled event type:", JSON.stringify(event, null, 2));
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
  }
});

*/
