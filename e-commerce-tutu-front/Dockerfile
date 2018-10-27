FROM nginx:alpine

COPY package*.json ./

WORKDIR /e-commerce-tutu-front

COPY ./ /e-commerce-tutu-front

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer

CMD ["ngserve"]
