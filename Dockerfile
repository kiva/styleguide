FROM ubuntu:xenial

#set up working directory
RUN mkdir /styleguide
COPY . /styleguide
WORKDIR /styleguide

RUN apt-get -q update &&\
	DEBIAN_FRONTEND="noninteractive" apt-get -q install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends curl &&\
    curl -sL https://deb.nodesource.com/setup_8.x | bash - &&\
    DEBIAN_FRONTEND="noninteractive" apt-get -q upgrade -y -o Dpkg::Options::="--force-confnew" --no-install-recommends &&\
    DEBIAN_FRONTEND="noninteractive" apt-get -q remove -y -o Dpkg::Options::="--force-confnew" --no-install-recommends nodejs &&\
    DEBIAN_FRONTEND="noninteractive" apt-get -q install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends nodejs &&\
    which node &&\
    node -v &&\
    npm -v