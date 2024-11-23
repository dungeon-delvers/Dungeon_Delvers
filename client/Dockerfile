# Use the official Node.js image as the base image for the build stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build



# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["npm", "start"]