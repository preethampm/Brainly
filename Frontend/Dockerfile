# Build stage
FROM node:iron-trixie-slim 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "dev"]