const BASE_URL = "https://api.sieg.com";

export function getSiegConfig() {
  const apiKey = process.env.SIEG_API_KEY;

  if (!apiKey) {
    const err = new Error("A variável SIEG_API_KEY não está configurada.");
    err.statusCode = 500;
    throw err;
  }

  return {
    apiKey: apiKey.trim()
  };
}

export async function siegFetch(path, options = {}) {
  const { apiKey } = getSiegConfig();

  const separator = path.includes("?") ? "&" : "?";

  const url =
    `${BASE_URL}${path}${separator}api_key=${encodeURIComponent(apiKey)}`;

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  const response = await fetch(url, {
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
    const err = new Error(
      `SIEG respondeu HTTP ${response.status}.`
    );

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
