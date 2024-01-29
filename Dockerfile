
FROM node:20.10.0-alpine3.18 AS base

FROM base AS appbuild

ARG VITE_BACKEND_BASE_URL
ARG VITE_LOCAL_STORAGE_SECRET_KEY

ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
ENV VITE_LOCAL_STORAGE_SECRET_KEY=$VITE_LOCAL_STORAGE_SECRET_KEY

WORKDIR /usr/app

COPY . .

# Copy package.json and package-lock.json (or npm.lock)
RUN npm config set strict-ssl false
RUN npm install
RUN npm run build

# This build takes the build
FROM nginx:alpine

WORKDIR /usr/app

COPY --from=appbuild /usr/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]