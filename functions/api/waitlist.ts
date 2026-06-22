interface Env {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DB: any;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS_HEADERS,
  });
}

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const result = await context.env.DB.prepare(
      "SELECT COUNT(*) as count FROM waitlist"
    ).all();

    const count = result?.results?.[0]?.count ?? 0;
    return json({ count });
  } catch {
    return json({ count: 0 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<{ email?: string }>();
    const email = body.email?.toLowerCase().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Email inválido" }, 400);
    }

    // Check if email already exists
    const existing = await context.env.DB.prepare(
      "SELECT position FROM waitlist WHERE email = ?"
    ).bind(email).first();

    if (existing) {
      return json({
        error: "Ya estás en la lista",
        position: (existing as { position: number }).position,
        email,
      }, 409);
    }

    // Get next position
    const posResult = await context.env.DB.prepare(
      "SELECT COALESCE(MAX(position), 0) + 1 as next_pos FROM waitlist"
    ).first();

    const position = (posResult as { next_pos: number })?.next_pos ?? 1;

    // Insert
    await context.env.DB.prepare(
      "INSERT INTO waitlist (email, position) VALUES (?, ?)"
    ).bind(email, position).run();

    return json({ position, email }, 201);
  } catch {
    return json({ error: "Error interno del servidor" }, 500);
  }
};
