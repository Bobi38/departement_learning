FROM node:24.13.0-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force
COPY . .

EXPOSE 6969
CMD ["npm", "run", "dev"]
