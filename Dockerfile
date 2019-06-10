# FROM node:12.0.0-alpine

FROM mhart/alpine-node:12

# install dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile






# Only copy over the Node pieces we need ~> Saves 35MB
FROM mhart/alpine-node:slim-12

ENV DASHBOARD_HN_API https://hn.algolia.com/api/v1/

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD node __sapper__/build
