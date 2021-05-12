FROM node:12.17

RUN apt-get update && apt-get install vim -y

WORKDIR /src/app

COPY ./package.json .

RUN npm install

COPY ./app .

RUN npm install -g nodemon

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT [ "dockerize", "-wait", "tcp://mysql:3306", "-timeout", "50s" ]


CMD ["nodemon", "index.js"]