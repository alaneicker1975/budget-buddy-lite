FROM node:12.16.2
LABEL Alan Eicker
WORKDIR /src
COPY package.json . src/
RUN yarn install
RUN yarn build
EXPOSE 9000
CMD ["yarn", "start"]