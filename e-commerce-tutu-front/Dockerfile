FROM node:10-alpine

ENV HOME='/usr/src/app'

EXPOSE 4200

WORKDIR $HOME
COPY ./ $HOME

RUN npm install && npm rebuild

CMD ["ngserve"]
