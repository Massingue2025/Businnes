# Usar imagem oficial Node.js (Debian-based)
FROM node:18

# Instalar dependências necessárias para Chromium
RUN apt-get update && apt-get install -y \
    libdrm2 \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência e instalar
COPY package*.json ./
RUN npm install

# Copiar todo o restante do código
COPY . .

# Expor a porta do seu app
EXPOSE 21465

# Comando para rodar seu servidor
CMD ["node", "server.js"]
