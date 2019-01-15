FROM node:10 as build

WORKDIR /app/server/public

COPY ./e-commerce-tutu-front/ /app/server/public/

RUN npm install && npm audit fix

COPY ./server/ /app/server/

RUN npm run build -- --output-path=./dist/out --prod 

FROM node:10

WORKDIR /app/server

COPY --from=build /app/server/ /app/server
COPY --from=build /app/server/public/dist/out/ /app/server/public

RUN cd /app/server/ \
    && npm install \
    && npm rebuild

ENTRYPOINT ["/app/server/sslcert/sslcert.sh"]

EXPOSE 80
EXPOSE 443
CMD ["node", "index.js" ]


