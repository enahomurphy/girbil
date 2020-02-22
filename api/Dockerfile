FROM node:10.16.3

LABEL maintainer="Enaho Murphy <<enahomurphy@gmail.com>>"

COPY . /var/www
ADD . /var/www

WORKDIR /var/www

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN ["yarn", "install"]

CMD ["yarn", "start"]

EXPOSE 8081
