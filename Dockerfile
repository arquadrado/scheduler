FROM node:14.15 as scheduler-front

WORKDIR /scheduler

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:stable-alpine as production-stage

COPY --from=scheduler-front /scheduler/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
