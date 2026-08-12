import { siegFetch, apiError } from "./_sieg.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Método não permitido." });
  }

  try {
    const data = await siegFetch("/api/Certificado/ListarCertificados", {
      method: "GET"
    });

    return res.status(200).json({
      ok: true,
      message: "Conexão com a API SIEG realizada.",
      data
    });
  } catch (error) {
    return apiError(res, error);
  }
}
