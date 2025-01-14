FROM node:22.13.0-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]


# docker build -t dopameme-image .
# docker run -v ${PWD}/src:/app/src:ro -d -p 3001:3000 --name dopameme-web dopameme-image