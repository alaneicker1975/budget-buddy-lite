FROM node:9-slim
MAINTAINER Alan Eicker
WORKDIR /src
COPY package.json /src
RUN yarn install
COPY . /src
EXPOSE 9000
CMD ["yarn", "start"]