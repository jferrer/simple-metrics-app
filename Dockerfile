FROM node:14.3.0-stretch
LABEL version=1.1.0

RUN npm -g config set user root

RUN npm install -g expo-cli

WORKDIR /app
ENV NODE_ENV development

COPY package.json app.json /app/

CMD exec bin/start.sh
