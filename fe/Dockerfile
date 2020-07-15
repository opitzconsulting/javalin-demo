FROM node:erbium-alpine3.9 as builder

RUN apk add --update npm && rm -rf /var/cache/apk/* && \
npm install -g @angular/cli
RUN mkdir /build

COPY . /build
WORKDIR /build
RUN npm install && npm run-script build

FROM nginx:1.18.0-alpine

RUN chmod -R 777 /var/log/nginx /var/cache/nginx /var/run \
     && chgrp -R 0 /etc/nginx \
     && chmod -R g+rwX /etc/nginx

COPY --from=builder /build/dist/mfeval-fe-angular /docroot
COPY docker/nginx.vh.default.conf.nginx /etc/nginx/conf.d/default.conf

RUN chown -R nginx: /docroot

EXPOSE 8080



