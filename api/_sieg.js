const BASE_URL = "https://api.sieg.com";

export function getSiegConfig() {
  const apiKey = process.env.SIEG_API_KEY;
  const email = process.env.SIEG_EMAIL || "";

  if (!apiKey) {
    const err = new Error("A variável SIEG_API_KEY não está configurada.");
    err.statusCode = 500;
    throw err;
  }

  return { apiKey, email };
}

export async function siegFetch(path, options = {}) {
  const { apiKey, email } = getSiegConfig();

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  // O Swagger público da SIEG expõe a autenticação como api_key.
  headers.set("api_key", apiKey);

  // Mantido opcional para compatibilidade com integrações vinculadas à conta.
  if (email) {
    headers.set("email", email);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";
  let body;

  if (contentType.includes("application/json")) {
    body = await response.json().catch(() => null);
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const err = new Error(`SIEG respondeu HTTP ${response.status}.`);
    err.statusCode = response.status;
    err.details = body;
    throw err;
  }

  return body;
}

export function apiError(res, error) {
  const status = Number(error?.statusCode) || 500;
  return res.status(status).json({
    ok: false,
    error: error?.message || "Erro inesperado.",
    details: error?.details ?? null
  });
}
