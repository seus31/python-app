FROM node:22.4.0

ENV WEB_APP_PATH /app

RUN mkdir $WEB_APP_PATH
WORKDIR $WEB_APP_PATH


COPY ./frontend $WEB_APP_PATH

RUN rm -rf .yarn
RUN rm -rf node_modules
RUN rm -rf yarn.lock

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]