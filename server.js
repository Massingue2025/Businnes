const express = require('express');
const cors = require('cors');
const path = require('path');
const { create } = require('@wppconnect-team/wppconnect');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve index.html

let client;

create()
  .then((wpp) => {
    client = wpp;
    console.log('✅ WppConnect iniciado. Escaneie o QR code no terminal.');
  })
  .catch((err) => {
    console.error('Erro ao iniciar WppConnect:', err);
  });

app.post('/send', async (req, res) => {
  const { number, message } = req.body;
  if (!client) return res.status(500).send({ error: 'Cliente não iniciado' });

  try {
    await client.sendText(`${number}@c.us`, message);
    res.send({ status: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send({ error: 'Falha ao enviar mensagem' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
