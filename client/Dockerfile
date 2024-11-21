# Use the official Node.js image as the base image for the build stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose --no-audit

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image as the base image for the serve stage
FROM nginx:alpine

# Copy the built files from the build stage to the Nginx html directory
COPY --from=build app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]