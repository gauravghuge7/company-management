# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Vite application for production 
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS serve

# Install a lightweight static file server
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "dist", "-l", "3000"]
