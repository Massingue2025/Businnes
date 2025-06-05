const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
app.use(express.json());

let client = null;

wppconnect
  .create({
    session: 'default',
    headless: true,
    useChrome: false,
    puppeteerOptions: {
      args: ['--no-sandbox'],
    }
  })
  .then((cli) => {
    client = cli;
    console.log("✅ Cliente WhatsApp pronto");

    app.post("/send-message", async (req, res) => {
      const { phone, message } = req.body;
      if (!client) return res.status(500).send("Cliente não conectado");
      try {
        const result = await client.sendText(`${phone}@c.us`, message);
        res.send(result);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  });

app.listen(21465, () => {
  console.log("🚀 Servidor rodando na porta 21465");
});
