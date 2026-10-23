// Supabase Edge Function: submit-score
// Deploy with: supabase functions deploy submit-score
// Configure ARCADE_ALLOWED_ORIGINS and use Supabase server-side secrets.
// NOTE: For a production competitive leaderboard, require authenticated users,
// enforce per-user rate limits, and validate scores against game-session evidence.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ARCADE_ALLOWED_ORIGINS") ?? "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const body = await req.json();
    const player_id = String(body.player_id ?? "").trim();
    const gamer_name = String(body.gamer_name ?? "").trim();
    const country_code = String(body.country_code ?? "XX").trim().toUpperCase();
    const game_id = String(body.game_id ?? "").trim();
    const score = Number(body.score);
    const xp = Number(body.xp ?? 0);

    if (!/^[a-zA-Z0-9_-]{8,80}$/.test(player_id)) throw new Error("Invalid player ID.");
    if (!gamer_name || gamer_name.length > 24) throw new Error("Gamer name must be 1–24 characters.");
    if (!/^[A-Z]{2}$/.test(country_code)) throw new Error("Country code must be a 2-letter ISO code.");
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(game_id)) throw new Error("Invalid game ID.");
    if (!Number.isSafeInteger(score) || score < 0 || score > 100000000) throw new Error("Score is outside the allowed range.");
    if (!Number.isSafeInteger(xp) || xp < 0 || xp > 100000000) throw new Error("XP is outside the allowed range.");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase.from("arcade_scores").insert({
      player_id, gamer_name, country_code, game_id, score, xp
    }).select("id, player_id, gamer_name, country_code, game_id, score, xp, submitted_at").single();

    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, score: data }), {
      status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err?.message ?? "Request failed") }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
