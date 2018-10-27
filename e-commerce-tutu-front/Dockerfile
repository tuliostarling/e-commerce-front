FROM node:alpine

COPY package*.json ./

WORKDIR /e-commerce-tutu-front

COPY ./ /e-commerce-tutu-front

RUN npm install && npm rebuild

CMD ["ngserve"]
