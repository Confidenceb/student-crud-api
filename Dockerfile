# FROM node:14-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# ENV NAME=Student-crud-api
# ENV PORT=3000

# EXPOSE 3000

# CMD ["node", "index.js"]

# Build stage
FROM node:14-alpine AS build

# Install necessary build tools
RUN apk add --no-cache python3 g++ make

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies and rebuild SQLite3 from source
RUN npm install && npm rebuild sqlite3 --build-from-source

# Copy the application code
COPY . .

# Production stage
FROM node:14-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Set environment variables
ENV NAME=Student-crud-api
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
