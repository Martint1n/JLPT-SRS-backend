FROM node:26-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN npx prisma generate
COPY src ./src
COPY tsconfig.json ./
RUN npm run build
CMD [ "npm", "run", "start" ]