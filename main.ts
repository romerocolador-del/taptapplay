import { serve } from "https://deno.land/std/http/server.ts";

let users: Record<number, { taps: number; energy: number }> = {};

serve(async (req) => {
  const url = new URL(req.url);

  // Servir archivos estáticos
  if (req.method === "GET") {
    try {
      const filePath =
        url.pathname === "/" ? "/public/index.html" : `/public${url.pathname}`;
      const file = await Deno.readFile("." + filePath);
      return new Response(file);
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }

  // Endpoint de tap
  if (req.method === "POST" && url.pathname === "/tap") {
    const body = await req.json();
    const userId = body.user;

    if (!users[userId]) {
      users[userId] = { taps: 0, energy: 100 };
    }

    if (users[userId].energy > 0) {
      users[userId].taps++;
      users[userId].energy--;
    }

    return Response.json(users[userId]);
  }

  return new Response("OK");
});
