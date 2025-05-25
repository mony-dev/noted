FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install sass

# Copy schema BEFORE generate
COPY prisma ./prisma
COPY .env .       

# Generate Prisma Client
RUN npx prisma generate

# Copy remaining source code
COPY . .

CMD ["npm", "run", "dev"]
