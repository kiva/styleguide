FROM ubuntu:xenial

RUN apt-get -q update
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential
RUN apt-get install --yes git
RUN apt-get install --yes php

COPY . /styleguide
WORKDIR /styleguide

RUN bin/bamboo_build.sh
WORKDIR /
RUN ls
RUN cp -r styleguide styleguide_export

# RUN bin/bamboo_deploy.sh

# change