# -----------------------------
# Base image
# -----------------------------
FROM node:25.8.2-trixie as base

# -----------------------------
# App image
# -----------------------------
FROM base as app

# -----------------------------
# Workspace image
# -----------------------------
FROM base as workspace

CMD ["bash"]

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    git \
    gh \
    vim \
    sudo \
    jq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# docker cli
ARG DOCKER_VERSION=26.0.1
RUN curl -LO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz \
  && tar xzf docker-${DOCKER_VERSION}.tgz \
  && cp docker/docker /usr/local/bin \
  && rm -rf docker docker-${DOCKER_VERSION}.tgz

# docker buildx plugin(BuildKit)
ARG DOCKER_BUILDX_VERSION=0.13.1
RUN curl -sSL https://github.com/docker/buildx/releases/download/v${DOCKER_BUILDX_VERSION}/buildx-v${DOCKER_BUILDX_VERSION}.linux-amd64 -o docker-buildx \
  && chmod +x docker-buildx \
  && mkdir -p /usr/local/lib/docker/cli-plugins \
  && mv docker-buildx /usr/local/lib/docker/cli-plugins/

# docker compose plugin
ARG DOCKER_COMPOSE_VERSION=2.26.1
RUN curl -sSL https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64 -o docker-compose \
  && chmod +x docker-compose \
  && mkdir -p /usr/local/lib/docker/cli-plugins \
  && mv docker-compose /usr/local/lib/docker/cli-plugins/

# normal user
ARG USER_NAME=node

# passwordless sudo
RUN echo "$USER_NAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USER_NAME \
  && chmod 0440 /etc/sudoers.d/$USER_NAME

# locales
ENV LANG=C.UTF-8

# timezone
ENV TZ Japan

# sticky bit for docker
RUN chmod +s /usr/local/bin/docker

# # DOODしているので利便性のためにホスト側のパスを取得して環境変数にセット
RUN echo "export DOCKER_HOST_DIR=\$(docker inspect \$(hostname) | jq -r '.[].Config.Labels[\"com.docker.compose.project.working_dir\"]' | head -n 1)" >> /home/$USER_NAME/.bashrc

# switch to normal user
USER $USER_NAME
