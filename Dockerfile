
FROM node:18

# Dependências do sistema para Chromium
RUN apt-get update && apt-get install -y \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libgbm-dev \
    libxshmfence-dev \
    wget \
    ca-certificates

# Diretório do app
WORKDIR /app

# Clonar WPPConnect Server
RUN git clone https://github.com/wppconnect-team/wppconnect-server.git .

# Copiar variáveis de ambiente
COPY .env .env

# Instalar dependências
RUN npm install

# Expor porta padrão
EXPOSE 21465

# Iniciar app
CMD ["npm", "start"]
