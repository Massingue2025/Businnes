# WppConnect Server para Render

Este projeto permite rodar o `wppconnect-server` com persistência de sessão no Render.com, usando Docker.

## 🚀 Como usar

1. Suba este projeto no GitHub
2. Vá até https://render.com e crie um novo Web Service
3. Configure como:
   - Environment: **Docker**
   - Build Command: *(deixe em branco)*
   - Start Command: *(deixe em branco, o Dockerfile já faz isso)*
   - Port: **21465**
4. Aguarde o deploy
5. Use a API via `https://seu-app.onrender.com/api/minha-sessao/...`
