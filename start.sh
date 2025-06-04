#!/bin/bash

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Clonar o WppConnect Server
git clone https://github.com/wppconnect-team/wppconnect-server.git
cd wppconnect-server
npm install &
cd ..

# Esperar 10s para instalação do npm em background
sleep 10

# Iniciar WppConnect Server em background
cd wppconnect-server
npm run start &

# Voltar e iniciar FastAPI
cd ..
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 10000
