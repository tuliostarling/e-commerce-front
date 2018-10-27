FROM nginx:alpine

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Install AngularCLI
RUN npm install -g @angular/cli

WORKDIR /e-commerce-tutu-front

COPY ./ /e-commerce-tutu-front

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer

CMD ["ngserve"]
