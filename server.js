const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
app.use(express.json());

let client = null;

wppconnect
  .create({
    session: 'default',
    headless: true,
    useChrome: true, // usar o Chrome/Chromium do sistema
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
  })
  .then((cli) => {
    client = cli;
    console.log("✅ Cliente WhatsApp pronto");

    app.post("/send-message", async (req, res) => {
      const { phone, message } = req.body;

      if (!client) {
        return res.status(500).send("Cliente não conectado");
      }

      try {
        const result = await client.sendText(`${phone}@c.us`, message);
        res.send(result);
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
        res.status(500).send(err.toString());
      }
    });
  })
  .catch((error) => {
    console.error("Erro ao iniciar WPPConnect:", error);
  });

const PORT = process.env.PORT || 21465;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
