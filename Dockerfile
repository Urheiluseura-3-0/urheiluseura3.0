# Build client
FROM node:18-alpine AS client

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY client/package*.json .

# Install dependencies
RUN npm ci

# Build frontend
COPY client .
RUN npm run build

# Build server
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy packace.json and package-lock.json
COPY server/package*.json .

# Install production dependencies
RUN npm ci --only=production

# Copy server code
COPY server .

# Copy static frontend
COPY --from=client /usr/src/app/build build

# Set the start command
CMD ["npm", "start"]