# -----------------------------
# Base image
# -----------------------------
FROM node:25.8.2-bookworm as base

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
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
