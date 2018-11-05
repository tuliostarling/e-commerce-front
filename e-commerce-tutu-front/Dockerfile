FROM node:10 as build

WORKDIR /usr/src/app

COPY ./nginx.conf /nginx.conf
COPY  package*.json /usr/src/app/

RUN npm install

COPY ./ /usr/src/app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.15

COPY --from=build /usr/src/app/dist/out/ /usr/share/nginx/html

COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
