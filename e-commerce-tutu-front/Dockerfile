FROM node:10 as build

WORKDIR /app

COPY package*.json /app/

RUN npm install && npm audit fix

COPY ./ /app/

RUN npm run build -- --output-path=./dist/out --prod

FROM nginx

COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

#ENTRYPOINT ["/app/server/sslcert/sslcert.sh"]
EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
