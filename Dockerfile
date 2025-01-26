# FROM node:14-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# ENV NAME=Student-crud-api
# ENV PORT=3000

# EXPOSE 3000

# CMD ["node", "index.js"]


# # Build stage
# FROM node:14-slim AS build

# # Install necessary tools for building native modules
# RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*

# # Set the working directory
# WORKDIR /app

# # Copy package files
# COPY package.json package-lock.json ./

# # Install dependencies and rebuild SQLite3
# RUN npm install --build-from-source=sqlite3 && npm rebuild sqlite3 --build-from-source

# # Copy application source code
# COPY . .

# # Remove development dependencies and unnecessary files
# RUN npm prune --production && rm -rf /root/.npm

# # Production stage
# FROM node:14-slim AS production

# # Install runtime dependencies (to ensure a clean production image)
# RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*

# # Set the working directory
# WORKDIR /app

# # Copy only the necessary files from the build stage
# COPY --from=build /app /app

# ENV NODE_ENV=production
# ENV PORT=3000

# EXPOSE 3000

# # Command to start the application
# CMD ["node", "index.js"]

# //////////////////////////
# # Use an official Node.js runtime as the base image
# FROM node:18

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install
# # Run tests 
# RUN npm test

# # Copy the rest of the application code
# COPY . .

# # Expose the port your app runs on
# EXPOSE 3000

# # Command to run your application
# CMD ["node", "index.js"]

# ///////////////////////////////

# Build stage
FROM node:18-slim AS builder

# Install build dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Run tests
RUN mkdir -p logs && \
    npm test

# Production stage
FROM node:18-slim

# Install production dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application files
COPY --from=builder /app/index.js ./
COPY --from=builder /app/logger.js ./

# Create logs directory
RUN mkdir -p logs

# Create data directory for SQLite
RUN mkdir -p data

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]