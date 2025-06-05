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
    ca-certificates \
 && apt-get clean

# Diretório de trabalho
WORKDIR /app

# Clonar repositório
RUN git clone https://github.com/wppconnect-team/wppconnect-server.git .

# Instalar dependências
RUN npm install

# Compilar TypeScript para JavaScript
RUN npm run build

# Copiar variáveis de ambiente
COPY .env .env

# Expor porta
EXPOSE 21465

# Iniciar o servidor
CMD ["npm", "start"]
