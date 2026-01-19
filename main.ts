import { serve } from "https://deno.land/std/http/server.ts";

let users: Record<number, any> = {};

serve(async (req) => {
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname === "/tap") {
    const body = await req.json();
    const id = body.user;

    if (!users[id]) {
      users[id] = { taps: 0, energy: 100 };
    }

    if (users[id].energy <= 0) {
      return new Response(
        JSON.stringify({ error: "No energy" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    users[id].taps++;
    users[id].energy--;

    return new Response(
      JSON.stringify(users[id]),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response("TapTapPlay backend running");
});
