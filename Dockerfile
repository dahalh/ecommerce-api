FROM node:16-alpine
WORKDIR /usr/src/app

COPY package* ./
RUN npm install
COPY . ./

EXPOSE 8000

#docker run <> --env-file ./.env to pass .env file
CMD ["node", "server.js"]