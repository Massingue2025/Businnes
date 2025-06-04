const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let client;

(async () => {
  try {
    client = await wppconnect.create();
    console.log('WhatsApp conectado!');
  } catch (err) {
    console.error('Erro ao conectar WhatsApp:', err);
  }
})();

app.post('/send', async (req, res) => {
  if (!client) return res.status(503).json({ error: 'Cliente não conectado ainda.' });

  const { number, message } = req.body;
  if (!number || !message) return res.status(400).json({ error: 'Faltando número ou mensagem' });

  try {
    const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;
    await client.sendText(formattedNumber, message);
    res.json({ success: true, message: 'Mensagem enviada!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
