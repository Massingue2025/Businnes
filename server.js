const express = require("express");
const path = require("path");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
app.use(express.static("public")); // Servir HTML e JS
app.use(express.json());

let client = null;
let currentQR = null;

wppconnect
  .create({
    session: 'default',
    headless: true,
    useChrome: true,
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
      console.log("📷 Novo QR Code gerado");
      currentQR = base64Qr;
    },
    statusFind: (statusSession, session) => {
      console.log("📲 Status da sessão:", statusSession);
    },
    logQR: false,
    autoClose: false, // MANTÉM A SESSÃO ABERTA PRA SEMPRE
  })
  .then((cli) => {
    client = cli;
    console.log("✅ Cliente conectado ao WhatsApp");

    client.onLogout(() => {
      console.log("🔌 Cliente desconectado. Reiniciando...");
      client = null;
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar WPPConnect:", error);
  });

// Endpoint para enviar mensagem
app.post("/send-message", async (req, res) => {
  const { phone, message } = req.body;

  if (!client) return res.status(500).send("Cliente não conectado");

  try {
    const result = await client.sendText(`${phone}@c.us`, message);
    res.send(result);
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).send(err.toString());
  }
});

// Endpoint para buscar o QR Code
app.get("/qr-code", (req, res) => {
  if (!currentQR) {
    return res.status(404).send("QR Code ainda não gerado");
  }

  res.json({ qr: currentQR });
});

// Página HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 21465;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
