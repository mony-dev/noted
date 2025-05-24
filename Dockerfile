FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use for development only. Not for production.
CMD ["npm", "run", "dev"]
